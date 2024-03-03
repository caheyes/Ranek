import createService from './axiosApiService';

const apiUsuario = createService('http://ranekapi.local/wp-json/api');
const apiCep = createService('http://viacep.com.br/ws/');

export default {
  getUsuario() {
    return apiUsuario.get('/usuario');
  },

  postUsuario(data) {
    return apiUsuario.post('/usuario', data);
  },

  putUsuario(data) {
    return apiUsuario.put(`/usuario`, data);
  },

  getCep(dto, format = 'json') {
    const url = `${dto}/${format}/`;

    return apiCep.get(url);
  },
};
