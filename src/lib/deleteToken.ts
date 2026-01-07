import crypto from 'crypto';

const secret = process.env.DELETE_TOKEN_SECRET;

if (!secret) {
  throw new Error('Missing DELETE_TOKEN_SECRET in environment variables');
}

type Payload = {
  id: string;
  nonce: string;
  iat: number; // issued at (ms)
};

// optional expiry to reduce abuse (still satisfies “until refresh”)
const MAX_AGE_MS = 1000 * 60 * 30; // 30 minutes

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function sign(data: string) {
  return base64url(crypto.createHmac('sha256', secret!).update(data).digest());
}

export function makeDeleteToken(id: string) {
  const payload: Payload = {
    id,
    nonce: crypto.randomBytes(16).toString('hex'),
    iat: Date.now(),
  };

  const payloadStr = JSON.stringify(payload);
  const payloadB64 = base64url(payloadStr);
  const signature = sign(payloadB64);

  return `${payloadB64}.${signature}`;
}

export function verifyDeleteToken(token: string, id: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadB64, signature] = parts;
  const expected = sign(payloadB64);
  if (expected !== signature) return false;

  let payload: Payload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
  } catch {
    return false;
  }

  if (payload.id !== id) return false;
  if (Date.now() - payload.iat > MAX_AGE_MS) return false;

  return true;
}
