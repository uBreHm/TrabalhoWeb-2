import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // URL base da sua API Node.js

export async function fetchEntries() {
  try {
    const response = await axios.get(`${BASE_URL}/entries`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar entradas: ${error.message}`);
  }
}

export async function fetchEntryById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/entries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar entrada por ID ${id}: ${error.message}`);
    }
  }

export async function createEntry(entryData) {
  try {
    const response = await axios.post(`${BASE_URL}/entries`, entryData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao criar entrada: ${error.message}`);
  }
}

export async function updateEntry(entryId, entryData) {
  try {
    const response = await axios.put(`${BASE_URL}/entries/${entryId}`, entryData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar entrada: ${error.message}`);
  }
}

export async function deleteEntry(entryId) {
  try {
    const response = await axios.delete(`${BASE_URL}/entries/${entryId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar entrada: ${error.message}`);
  }
}
