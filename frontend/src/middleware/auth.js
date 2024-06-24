// middleware/auth.js
import jwt from 'jsonwebtoken';
import { checkAdmin } from '@/pages/api/hello';

const secret = 'b88a58a7effe40649cbcd84e5533bb15'; // Defina seu segredo aqui ou use variáveis de ambiente

export async function authMiddleware(ctx) {
  const { req, res } = ctx;
  const token = extractTokenFromCookies(req.cookies);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, secret);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const isAdminResponse = await checkAdmin(token);
    if (isAdminResponse.isAdmin) {
      return { props: { isAdmin: true }}; 
    }

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

function extractTokenFromCookies(cookies) {
  if (!cookies) {
    return '';
  }
  const token = cookies.token;

  return token || '';
}
