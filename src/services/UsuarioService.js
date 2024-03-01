import createService from './axiosApiService';

const apiUsuario = createService('http://localhost:3000/');
const apiCep = createService('http://viacep.com.br/ws/');

export default {
  getUsuario(dto) {
    return apiUsuario.get('/usuario/' + dto);
  },

  postUsuario(data) {
    return apiUsuario.post('/usuario', data);
  },

  putUsuario(data, id) {
    return apiUsuario.put(`/usuario/${id}`, data);
  },

  getCep(dto, format = 'json') {
    const url = `${dto}/${format}/`;

    return apiCep.get(url);
  },
};
