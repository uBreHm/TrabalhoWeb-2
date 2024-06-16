import jwt from 'jsonwebtoken';

const secret = "b88a58a7effe40649cbcd84e5533bb15";

export async function authMiddleware(req) {
  const token = req.cookies.token || '';

  if (!token) {
    return {
      status: 302,
      headers: {
        location: '/login'
      }
    };
  }

  try {
    const decoded = jwt.verify(token, secret);

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return {
        status: 302,
        headers: {
          location: '/login'
        }
      };
    }

    // Verificar se o usuário é administrador, se necessário
    // if (decoded.role !== 'admin') {
    //   console.error('Usuário não é administrador');
    //   return {
    //     status: 302,
    //     headers: {
    //       location: '/'
    //     }
    //   };
    // }

    // Atualiza o token no cookie
    req.cookies.token = token;

    return {
      next: {}
    };
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return {
      status: 302,
      headers: {
        location: '/login'
      }
    };
  }
}
