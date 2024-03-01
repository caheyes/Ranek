import { createStore } from 'vuex';
import UsuarioService from '@/services/UsuarioService';
import ProdutoService from '@/services/ProdutoService';

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
    usuario_produtos: null,
  },
  getters: {},
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload); //para mudar o estado que ta em objetos
    },
    UPTADE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshit(payload); //puxar o item para o inicio da array, igual o push mas ele manda para o final
    },
  },
  actions: {
    getUsuarioProdutos(context) {
      let dto = `?usuario_id=${context.state.usuario.id}`;

      ProdutoService.getProdutos(dto).then((res) => {
        context.commit('UPTADE_USUARIO_PRODUTOS', res.data);
      });
    },

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

    deslogarUsuario(context) {
      //limpando o usuario
      context.commit('UPDATE_USUARIO', {
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
      });

      context.commit('UPDATE_LOGIN', false);
    },
  },
  modules: {},
});
