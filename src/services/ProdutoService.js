import createService from './axiosApiService';

const api = createService('http://localhost:3000/');

export default {
  getProdutos(dto) {
    return api.get('/produto/' + dto);
  },

  // sendData(data) {
  //   return service1.post('/data', data);
  // },

  // deleteData(id) {
  //   return service1.delete(`/data/${id}`);
  // },
};
