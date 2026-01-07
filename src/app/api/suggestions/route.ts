import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { hasProfanity } from '@/lib/profanity';
import { makeDeleteToken } from '@/lib/deleteToken';
import type { SuggestionChannel } from '@/types/suggestion';

const PostSchema = z.object({
  channel: z.enum(['idea', 'feedback']),
  message: z.string().min(1).max(240),
});

function getClientIp(req: Request) {
  // Vercel commonly sets x-forwarded-for (may contain multiple IPs)
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xrip = req.headers.get('x-real-ip');
  if (xrip) return xrip.trim();
  return 'unknown';
}

function hashIp(ip: string) {
  // hash ip
  const secret = process.env.DELETE_TOKEN_SECRET || 'fallback';
  return crypto.createHmac('sha256', secret).update(ip).digest('hex');
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const channel = searchParams.get('channel') as SuggestionChannel | null;

  const query = supabaseAdmin
    .from('suggestions')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(100);

  const finalQuery = channel ? query.eq('channel', channel) : query;

  const { data, error } = await finalQuery;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { channel, message } = parsed.data;

  // Optional anti-spam: block links
  if (/https?:\/\/\S+/i.test(message)) {
    return NextResponse.json({ error: 'Links are not allowed.' }, { status: 400 });
  }

  // Profanity block
  if (hasProfanity(message)) {
    return NextResponse.json({ error: 'Message contains prohibited words.' }, { status: 400 });
  }

  // Anti-spam: per IP cooldown + hourly limit + duplicate guard
  const ip = getClientIp(req);
  const ip_hash = hashIp(ip);

  const now = Date.now();
  const cooldownCutoff = new Date(now - 15_000).toISOString(); // 15s cooldown
  const hourCutoff = new Date(now - 60 * 60_000).toISOString(); // 1 hour

  // Cooldown check last 15s
  const { count: recentCount, error: recentErr } = await supabaseAdmin
    .from('suggestions')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ip_hash)
    .gte('created_at', cooldownCutoff);

  if (recentErr) return NextResponse.json({ error: recentErr.message }, { status: 500 });
  if ((recentCount ?? 0) >= 1) {
    return NextResponse.json(
      { error: 'Too many messages. Please wait 15 seconds before sending again.' },
      { status: 429 }
    );
  }

  // Hourly cap: max 15 / hour
  const { count: hourCount, error: hourErr } = await supabaseAdmin
    .from('suggestions')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ip_hash)
    .gte('created_at', hourCutoff);

  if (hourErr) return NextResponse.json({ error: hourErr.message }, { status: 500 });
  if ((hourCount ?? 0) >= 15) {
    return NextResponse.json(
      { error: 'Rate limit reached. Please try again later.' },
      { status: 429 }
    );
  }

  // Duplicate guard: same message as last message in same channel (within 10 minutes)
  const dupCutoff = new Date(now - 10 * 60_000).toISOString();
  const { data: lastMsg, error: lastErr } = await supabaseAdmin
    .from('suggestions')
    .select('message')
    .eq('ip_hash', ip_hash)
    .eq('channel', channel)
    .gte('created_at', dupCutoff)
    .order('created_at', { ascending: false })
    .limit(1);

  if (lastErr) return NextResponse.json({ error: lastErr.message }, { status: 500 });
  if (lastMsg?.[0]?.message?.trim() === message.trim()) {
    return NextResponse.json(
      { error: 'Duplicate message detected. Please change your text.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('suggestions')
    .insert([{ channel, message, status: 'new', ip_hash }])
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const deleteToken = makeDeleteToken(data.id);
  return NextResponse.json({ item: data, deleteToken }, { status: 201 });
}
