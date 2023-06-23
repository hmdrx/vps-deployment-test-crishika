import apiClient from './apiClient';

export const loginApi = data => apiClient.post('/user/login', data);
export const registerApi = data => apiClient.post('/user/register', data);
