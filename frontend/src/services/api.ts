import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2300/api/v1/',
});

export const createUser = (userData: any) => api.post('users', userData);
export const createOrder = (orderData: any) => api.post('orders', orderData);
export const createProduct = (productData: any) => api.post('products', productData);
export const getOrders = (filters: any) => api.get('orders', { params: filters });
