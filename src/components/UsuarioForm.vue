<template>
  <form>
    <div v-if="mostrarDadosLogin" class="usuario">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" v-model="nome">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email" :disabled="desabilitar">
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" v-model="senha">
    </div>
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="preencherCep">
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="rua">
    <label for="numero">Número</label>
    <input id="numero" name="numero" type="text" v-model="numero">
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="bairro">
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="cidade">
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="estado">
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
  import { mapFields } from '@/utils/helpers.js';
  import UsuarioService from '@/services/UsuarioService';

  export default {
    name: "UsuarioForm",
    props: {
      desabilitar: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapFields({
        fields: ['nome', 'email', 'senha', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
        base: 'usuario',
        mutation: 'UPDATE_USUARIO'
      }),
      mostrarDadosLogin() {
        return (!this.$store.state.login || this.$route.name === 'usuario-editar');
      }
    },
    methods: {
      preencherCep() {
        const cep = this.cep.replace(/\D/g, ''); //irar pegar só digitos do cep
        if(cep.length === 8) {
          UsuarioService.getCep(cep)
          .then(res => {
            this.rua = res.data.logradouro;
            this.bairro = res.data.bairro;
            this.estado = res.data.uf;
            this.cidade = res.data.localidade;
          })
        }
      }
    }
  }
</script>

<style scoped>
  form, .usuario {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
  }

  .usuario {
    grid-column: 1 / 3;
  }

  .button {
    grid-column: 2;
    margin-top: 10px;
  }
</style>