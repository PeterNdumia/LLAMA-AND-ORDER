import axios from 'axios';

const API_URL = 'http://localhost:5000'

export const queryRAG = async (question) => {
  const response = await axios.post("http://localhost:5000/api/query", { question });
  return response.data.answer;
};

export const runEvaluation = async () => {
  const response = await axios.get(`${API_URL}/api/evaluate`);
  return response.data.results;
};