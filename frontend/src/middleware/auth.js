import jwt from 'jsonwebtoken';
import { checkAdmin } from '@/pages/api/hello';
import { fetchUsersById } from '@/pages/api/user';

const secret = 'b88a58a7effe40649cbcd84e5533bb15'; 

export async function authMiddleware(ctx) {
  const { req } = ctx;
  const token = extractTokenFromCookies(req.cookies);

  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    const decoded = jwt.verify(token, secret);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return { isAuthenticated: false };
    }

    const isAdminResponse = await checkAdmin(token);
    if (isAdminResponse.isAdmin) {
      return { isAuthenticated: true, isAdmin: true };
    }

    

    return { isAuthenticated: true, isAdmin: false };
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return { isAuthenticated: false };
  }
}

function extractTokenFromCookies(cookies) {
  if (!cookies) {
    return '';
  }
  const token = cookies.token;
  return token || '';
}
