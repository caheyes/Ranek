import axios from 'axios';

const createService = (baseURL) => {
  const apiClient = axios.create({
    baseURL, // Substitua pela sua URL de API
  });

  //interceção em toda api para colocar o token
  apiClient.interceptors.request.use(
    function (config) {
      const token = window.localStorage.token;
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

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
