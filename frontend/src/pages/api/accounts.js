
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
export async function fetchAccounts() {
  try {
    const response = await axios.get(`${BASE_URL}/accounts`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria: ${error.message}`);
  }
}

export async function fetchAccountsById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria por ID ${id}: ${error.message}`);
  }
}

export async function createAccounts(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/accounts`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao criar categoria: ${error.message}`);
  }
}

export async function updateAccounts(userId, userData) {
  try {
    const response = await axios.put(`${BASE_URL}/accounts/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
}

export async function deleteAccounts(userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/accounts/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar categoria: ${error.message}`);
  }
}
