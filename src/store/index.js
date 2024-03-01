import { createStore } from 'vuex';
import UsuarioService from '@/services/UsuarioService';

export default createStore({
  strict: true, //para dar erro quando faço a mudança de estado incorretamente
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
      state.usuario = Object.assign(state.usuario, payload); //para mudar o estado que ta em objetos
    },
  },
  actions: {
    getUsuario(context, payload) {
      //usando o return para fazer o then em outros lugares
      return UsuarioService.getUsuario(payload).then((res) => {
        context.commit('UPDATE_USUARIO', res.data);
        context.commit('UPDATE_LOGIN', true);
      });
    },

    criarUsuario(context, payload) {
      context.commit('UPDATE_USUARIO', { id: payload.email }); //atualizando o id primeiro
      return UsuarioService.postUsuario(payload);
    },
  },
  modules: {},
});
