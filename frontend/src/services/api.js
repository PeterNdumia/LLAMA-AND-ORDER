import axios from 'axios';

const API_URL = 'http://localhost:5000'

export const queryRAG = async (question) => {
    try {
      const response = await axios.post('http://localhost:5000/api/query', 
        { question },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );
      return response.data;
    } catch (error) {
      console.error('Full error details:', {
        message: error.message,
        config: error.config,
        response: error.response,
        stack: error.stack
      });
      throw error;
    }
  };
  
export const runEvaluation = async () => {
  const response = await axios.get(`${API_URL}/api/evaluate`);
  return response.data.results;
};