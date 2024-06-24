
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; 
export async function fetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria: ${error.message}`);
  }
}

export async function fetchCategoriesById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar categoria por ID ${id}: ${error.message}`);
  }
}

export async function createCategories(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/categories`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao criar categoria: ${error.message}`);
  }
}

export async function updateCategories(userId, userData) {
  try {
    const response = await axios.put(`${BASE_URL}/categories/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar categoria: ${error.message}`);
  }
}

export async function deleteCategories(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar categoria: ${error.message}`);
  }
}

export async function fetchCategoriesByType(type) {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    const filteredCategories = response.data
      .filter(category => category.type === type);
    return filteredCategories;
  } catch (error) {
    throw new Error(`Erro ao buscar categorias por tipo ${type}: ${error.message}`);
  }
}

