import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const persistSubscriberDev = (email: string) => {
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

const subscribeToConvertKit = async (email: string): Promise<{ success: boolean; error?: string }> => {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    console.warn('[subscribe] CONVERTKIT_API_KEY or CONVERTKIT_FORM_ID missing — dev mode persist only');
    persistSubscriberDev(email);
    return { success: true };
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey, email })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('[subscribe] ConvertKit error:', res.status, data);
      return { success: false, error: 'provider_error' };
    }

    if (data?.subscription?.state === 'failed') {
      return { success: false, error: 'subscribe_failed' };
    }

    return { success: true };
  } catch (err) {
    console.error('[subscribe] ConvertKit request failed:', err);
    return { success: false, error: 'provider_unreachable' };
  }
};

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  const wantsRedirect = !contentType.includes('application/json');

  try {
    let email = '';

    if (contentType.includes('application/json')) {
      const body = (await request.json()) as { email?: string; website?: string };
      if ((body.website ?? '').trim().length > 0) {
        if (wantsRedirect) {
          return NextResponse.redirect(new URL('/#newsletter', request.url), 303);
        }
        return Response.json({ success: true });
      }
      email = (body.email ?? '').trim().toLowerCase();
    } else {
      const formData = await request.formData();
      const honeypot = String(formData.get('website') ?? '').trim();
      if (honeypot.length > 0) {
        return NextResponse.redirect(new URL('/#newsletter', request.url), 303);
      }
      email = String(formData.get('email') ?? '').trim().toLowerCase();
    }

    if (!isEmail(email)) {
      if (wantsRedirect) {
        return NextResponse.redirect(new URL('/#newsletter?error=invalid_email', request.url), 303);
      }
      return Response.json({ success: false, error: 'invalid_email' }, { status: 400 });
    }

    const result = await subscribeToConvertKit(email);

    if (!result.success) {
      if (wantsRedirect) {
        return NextResponse.redirect(new URL('/#newsletter?error=subscribe_failed', request.url), 303);
      }
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }

    if (wantsRedirect) {
      return NextResponse.redirect(new URL('/#newsletter?subscribed=1', request.url), 303);
    }
    return Response.json({ success: true });
  } catch {
    if (wantsRedirect) {
      return NextResponse.redirect(new URL('/#newsletter?error=server_error', request.url), 303);
    }
    return Response.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
