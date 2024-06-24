
const BASE_URL = 'http://localhost:8080/api';

export async function fetchFromApi(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Erro ao fazer requisição: ${response.statusText}`);
  }
  return response.json();
}

export async function login(user, pwd) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, pwd }),
    });
    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Erro ao fazer login: ${error.message}`);
  }
}

export async function checkAdmin(token) {
  try {
    const response = await fetch(`${BASE_URL}/auth/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok || response.status === 'off') {
      throw new Error("Usuário não é administrador");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Erro ao verificar acesso de administrador: ${error.message}`);
  }
}
