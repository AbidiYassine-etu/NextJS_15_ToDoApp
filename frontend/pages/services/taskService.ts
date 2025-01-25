import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks'; // Replace with your NestJS backend URL

export const getTasks = async (userId: number) => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (task: { title: string; description: string; userId: number }) => {
  const token = localStorage.getItem('token');
  return axios.post(API_URL, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (id: number, isCompleted: boolean) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/${id}`, { isCompleted }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (id: number) => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
