import createService from './axiosApiService';

const api = createService('http://localhost:3000/');

export default {
  getProdutos(dto) {
    return api.get('/produto/' + dto);
  },

  postProdutos(data) {
    return api.post('/produto', data);
  },

  deletarProduto(id) {
    return api.delete(`/produto/${id}`);
  },
};
