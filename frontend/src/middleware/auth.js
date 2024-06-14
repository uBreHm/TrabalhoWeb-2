import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const secret = "b88a58a7effe40649cbcd84e5533bb15";

export async function middleware(req) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jwt.verify(token, secret);

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verifica se o usuário é administrador
    if (decoded.role !== 'admin') {
      console.error('Usuário não é administrador');
      return NextResponse.redirect(new URL('/', req.url));
    }

    cookieStore.set('token', token, { httpOnly: true, sameSite: 'strict', secure: true });

    return NextResponse.next();
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
};
