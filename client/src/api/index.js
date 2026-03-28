import axios from 'axios';

// Ensure the URL always ends with /api even if not provided in env
const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const baseUrlWithApi = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: baseUrlWithApi,
});

export const askAI = async (prompt) => {
  const { data } = await api.post('/ask-ai', { prompt });
  return data.result;
};

export const saveFlow = async (prompt, response) => {
  const { data } = await api.post('/save-flow', { prompt, response });
  return data;
};

export const getSavedFlows = async () => {
  const { data } = await api.get('/saved-flows');
  return data;
};

export default api;
