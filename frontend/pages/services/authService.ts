import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // Replace with your NestJS backend URL

export const signup = async (username: string, password: string) => {
  return axios.post(`${API_URL}/signup`, { username, password });
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  console.log(response.data);
  localStorage.setItem('token', response.data.access_token); // Save the token locally
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
