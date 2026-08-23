import { NextResponse } from 'next/server';
import { ADMIN_PASSWORD } from '@/app/data/padrinhosAccountsServer';

// In-memory brute-force protection
const adminLoginAttempts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = adminLoginAttempts.get(ip);
  if (!entry) return false;

  if (now > entry.resetTime) {
    adminLoginAttempts.delete(ip);
    return false;
  }

  return entry.count >= 5; // Max 5 attempts per 3 minutes
}

function registerAttempt(ip: string, success: boolean) {
  const now = Date.now();
  if (success) {
    adminLoginAttempts.delete(ip);
    return;
  }

  const entry = adminLoginAttempts.get(ip);
  if (!entry || now > entry.resetTime) {
    adminLoginAttempts.set(ip, { count: 1, resetTime: now + 3 * 60 * 1000 });
  } else {
    entry.count += 1;
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local-client';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Muitas tentativas consecutivas. Aguarde 3 minutos.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Senha é obrigatória.' },
        { status: 400 }
      );
    }

    const cleanPass = String(password).trim();
    const isValid =
      cleanPass === ADMIN_PASSWORD ||
      cleanPass.toLowerCase() === ADMIN_PASSWORD.toLowerCase();

    if (!isValid) {
      registerAttempt(ip, false);
      return NextResponse.json(
        { success: false, message: 'Senha incorreta!' },
        { status: 401 }
      );
    }

    registerAttempt(ip, true);

    return NextResponse.json({
      success: true,
      message: 'Autenticado com sucesso.',
    });
  } catch (error) {
    console.error('Error in admin auth:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno ao autenticar.' },
      { status: 500 }
    );
  }
}
