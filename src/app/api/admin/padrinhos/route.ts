import { NextResponse } from 'next/server';
import { SERVER_PADRINHOS_ACCOUNTS, ADMIN_PASSWORD } from '@/app/data/padrinhosAccountsServer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { adminSecret } = body;

    // Check admin secret or session
    if (
      !adminSecret ||
      (adminSecret !== ADMIN_PASSWORD && adminSecret.toLowerCase() !== ADMIN_PASSWORD.toLowerCase())
    ) {
      return NextResponse.json(
        { success: false, message: 'Acesso não autorizado.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      accounts: SERVER_PADRINHOS_ACCOUNTS,
    });
  } catch (error) {
    console.error('Error fetching admin padrinhos:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}
