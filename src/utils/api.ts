import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};