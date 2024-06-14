// src/middlewares/auth.js
import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';

const secret = "b88a58a7effe40649cbcd84e5533bb15";

export async function middleware(req) {
  const token = req.cookies.get('token') || '';

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwtDecode(token);

    // Verifica se o token está próximo de expirar
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Atualiza o cookie do token (opcional)
    req.cookies.set('token', token, { httpOnly: true, sameSite: 'strict', secure: true });

    return NextResponse.next();
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/admin/:path*', // Rota protegida que requer autenticação de administrador
};
