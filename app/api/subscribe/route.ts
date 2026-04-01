import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const persistSubscriber = (email: string) => {
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
};

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const wantsRedirect = !contentType.includes('application/json');

  try {
    let email = '';

    if (contentType.includes('application/json')) {
      const body = (await request.json()) as { email?: string };
      email = (body.email ?? '').trim().toLowerCase();
    } else {
      const formData = await request.formData();
      email = String(formData.get('email') ?? '').trim().toLowerCase();
    }

    if (!isEmail(email)) {
      if (wantsRedirect) {
        return NextResponse.redirect(new URL('/#newsletter', request.url), 303);
      }
      return Response.json({ success: false, error: 'invalid_email' }, { status: 400 });
    }

    persistSubscriber(email);

    if (wantsRedirect) {
      return NextResponse.redirect(new URL('/#newsletter', request.url), 303);
    }

    return Response.json({ success: true });
  } catch {
    if (wantsRedirect) {
      return NextResponse.redirect(new URL('/#newsletter', request.url), 303);
    }
    return Response.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
