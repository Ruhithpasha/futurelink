import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
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
