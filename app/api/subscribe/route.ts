import fs from 'node:fs';
import path from 'node:path';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = (body.email ?? '').trim().toLowerCase();

    if (!isEmail(email)) {
      return Response.json({ success: false, error: 'invalid_email' }, { status: 400 });
    }

    if (process.env.NODE_ENV !== 'production') {
      const filePath = path.join(process.cwd(), 'data', 'subscribers-dev.json');
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      const existing = fs.existsSync(filePath)
        ? (JSON.parse(fs.readFileSync(filePath, 'utf8')) as Array<{ email: string; date: string }>)
        : [];

      if (!existing.find((row) => row.email === email)) {
        existing.push({ email, date: new Date().toISOString() });
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
