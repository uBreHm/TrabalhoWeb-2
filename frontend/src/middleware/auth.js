// middleware/auth.js
import { checkAdmin } from '@/pages/api/hello';
import jwt from 'jsonwebtoken';

export async function authMiddleware({ url, cookies }) {
  const token = extractTokenFromCookies(cookies);

  if (!token) {
    return { next: { pathname: '/login' } }; // Redireciona para a página de login se não houver token
  }

  try {
    //const decoded = jwt.verify(token, secret);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return { next: { pathname: '/login' } }; // Token expirado, redireciona para a página de login
    }

    // Verifica se o usuário é administrador
    const isAdminResponse = await checkAdmin(token);
    if(isAdminResponse.isAdmin){
      return true;
    }

    return { next: null }; // Continua para a próxima etapa sem redirecionamento
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return { next: { pathname: '/login' } }; // Qualquer erro de verificação de token, redireciona para a página de login
  }
}

function extractTokenFromCookies(cookies) {
  if (!cookies) {
    return '';
  }
  const token = cookies.token;

  return token || '';
}

