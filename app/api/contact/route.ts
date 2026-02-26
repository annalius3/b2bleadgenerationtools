const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
      website?: string;
    };

    if ((body.website ?? '').trim().length > 0) {
      return Response.json({ success: true });
    }

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const message = (body.message ?? '').trim();

    if (name.length < 2 || !isEmail(email) || message.length < 10) {
      return Response.json({ success: false, error: 'invalid_input' }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
