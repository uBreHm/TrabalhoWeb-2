// api.js

const BASE_URL = 'http://localhost:8080/api'; // URL base da sua API Node.js

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
