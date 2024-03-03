import createService from './axiosApiService';

const api = createService('http://ranekapi.local/wp-json');

export default {
  login(body) {
    return api.post('/jwt-auth/v1/token', body);
  },

  validaToken() {
    return api.post('/jwt-auth/v1/token/validate');
  },
};
