import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 20000,
});

export const signup = async (payload: { email: string; password: string; full_name?: string }) => {
  const response = await api.post('/auth/signup', payload);
  return response.data;
};

export const login = async (payload: { email: string; password: string }) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await api.get('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const uploadDocument = async (token: string, file: any, category: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  const response = await api.post('/documents/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const listDocuments = async (token: string) => {
  const response = await api.get('/documents/', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteDocument = async (token: string, documentId: string) => {
  const response = await api.delete(`/documents/${documentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;
