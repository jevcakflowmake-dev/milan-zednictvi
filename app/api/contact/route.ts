import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Chybí povinná pole.' }, { status: 400 });
    }

    // Zde lze napojit e-mailovou službu, např.:
    // await resend.emails.send({ from: '...', to: 'milan@example.com', ... });
    console.log('[Kontaktní formulář]', { name, email, phone, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Interní chyba serveru.' }, { status: 500 });
  }
}
