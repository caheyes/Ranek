import createService from './axiosApiService';

const api = createService('http://localhost:3000/');

export default {
  getUsuario(dto) {
    return api.get('/usuario/' + dto);
  },
};
