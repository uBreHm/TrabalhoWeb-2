// pages/api/user.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // URL base da sua API Node.js

export async function fetchUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar usuários: ${error.message}`);
  }
}

export async function fetchUsersById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por ID ${id}: ${error.message}`);
  }
}

export async function createUser(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error.message}`);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error.message}`);
  }
}
