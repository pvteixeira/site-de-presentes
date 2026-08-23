import { NextResponse } from 'next/server';
import { SERVER_PADRINHOS_ACCOUNTS } from '@/app/data/padrinhosAccountsServer';

// In-memory brute-force protection (per IP)
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry) return false;

  if (now > entry.resetTime) {
    loginAttempts.delete(ip);
    return false;
  }

  return entry.count >= 8; // Max 8 attempts per 2 minutes
}

function registerAttempt(ip: string, success: boolean) {
  const now = Date.now();
  if (success) {
    loginAttempts.delete(ip);
    return;
  }

  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 2 * 60 * 1000 });
  } else {
    entry.count += 1;
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local-client';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Muitas tentativas consecutivas. Aguarde 2 minutos para tentar novamente.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Usuário e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    const cleanUser = String(username).trim().toLowerCase();
    const cleanPass = String(password).trim();

    const userMatch = SERVER_PADRINHOS_ACCOUNTS.find((acc) => {
      const matchUsername =
        acc.username.toLowerCase() === cleanUser ||
        acc.alternateUsernames?.some((alt) => alt.toLowerCase() === cleanUser);

      const matchPassword =
        acc.password === cleanPass ||
        (acc.role === 'noivos' && acc.password.toLowerCase() === cleanPass.toLowerCase());

      return matchUsername && matchPassword;
    });

    if (!userMatch) {
      registerAttempt(ip, false);
      return NextResponse.json(
        { success: false, message: 'Usuário ou senha incorretos. Por favor, verifique com os noivos.' },
        { status: 401 }
      );
    }

    registerAttempt(ip, true);

    // Sanitized user data WITHOUT the password field
    const sanitizedUser = {
      id: userMatch.id,
      name: userMatch.name,
      username: userMatch.username,
      role: userMatch.role,
      members: userMatch.members,
      customMessage: userMatch.customMessage,
      daminha: userMatch.daminha,
      pajem: userMatch.pajem,
    };

    return NextResponse.json({
      success: true,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Error in padrinhos auth:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno ao autenticar.' },
      { status: 500 }
    );
  }
}
