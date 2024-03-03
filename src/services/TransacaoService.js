import createService from './axiosApiService';

const apiUsuario = createService('http://ranekapi.local/wp-json/api');

export default {
  postTransacao(data) {
    return apiUsuario.post('/transacao', data);
  },

  getTransacao() {
    //para ter mais segurança na api ?tipo= ao inves do id do usuário, ai ele pega os dados do usuário logado no store.state
    return apiUsuario.get('/transacao?tipo=comprador_id');
  },

  getTransacaoVendedor() {
    return apiUsuario.get('/transacao?tipo=vendedor_id');
  },
};
