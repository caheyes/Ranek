import createService from './axiosApiService';

const apiUsuario = createService('http://localhost:3000/');

export default {
  postTransacao(data) {
    return apiUsuario.post('/transacao', data);
  },

  getTransacao(dto) {
    return apiUsuario.get('/transacao?comprador_id=' + dto);
  },

  getTransacaoVendedor(dto) {
    return apiUsuario.get('/transacao?vendedor_id=' + dto);
  },
};
