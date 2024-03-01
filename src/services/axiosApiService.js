import axios from 'axios';

const createService = (baseURL) => {
  const apiClient = axios.create({
    baseURL, // Substitua pela sua URL de API
    headers: {
      'Content-Type': 'application/json',
      // Adicione outros cabeçalhos, se necessário
    },
  });

  return {
    get(endpoint) {
      return apiClient.get(endpoint);
    },

    post(endpoint, data) {
      return apiClient.post(endpoint, data);
    },

    put(endpoint, data) {
      return apiClient.put(endpoint, data);
    },

    delete(endpoint) {
      return apiClient.delete(endpoint);
    },
  };
};

export default createService;
