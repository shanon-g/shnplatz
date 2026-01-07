import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { verifyDeleteToken } from '@/lib/deleteToken';

const PutSchema = z.object({
  status: z.enum(['new', 'seen']),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const adminToken = req.headers.get('x-admin-token');
  if (!adminToken || adminToken !== process.env.ADMIN_EDIT_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = PutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { status } = parsed.data;

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('suggestions')
    .update({ status })
    .eq('id', id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const adminToken = req.headers.get('x-admin-token');
  const isAdmin = adminToken && adminToken === process.env.ADMIN_EDIT_TOKEN;

  const token = req.headers.get('x-delete-token');
  const ownerDeleteOk = token && verifyDeleteToken(token, id);

  if (!isAdmin && !ownerDeleteOk) {
    return NextResponse.json({ error: 'Unauthorized delete' }, { status: 401 });
  }
  
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from('suggestions').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}