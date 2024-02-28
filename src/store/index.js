import { createStore } from 'vuex';
import UsuarioService from '@/services/UsuarioService';

export default createStore({
  state: {
    login: false,
    usuario: {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
  },
  getters: {},
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = payload;
    },
  },
  actions: {
    getUsuario(context, payload) {
      UsuarioService.getUsuario(payload).then((res) => {
        context.commit('UPDATE_USUARIO', res.data);
        context.commit('UPDATE_LOGIN', true);
      });
    },
  },
  modules: {},
});
