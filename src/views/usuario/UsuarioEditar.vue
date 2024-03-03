<template>
  <section>
    <UsuarioForm :desabilitar="false">
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
    <ErroNotificacao :erros="erros"/>
  </section>
</template>

<script>
  import UsuarioForm from '@/components/UsuarioForm.vue';
  import UsuarioService from '@/services/UsuarioService';

  export default {
    name: 'UsuarioEditar',
    components: {
      UsuarioForm
    },
    data() {
      return {
        erros: []
      }
    },
    methods: {
      atualizarUsuario() {
        this.erros = [];

        let usuario = this.$store.state.usuario;

        UsuarioService.putUsuario(usuario)
        .then(() => {
          this.$store.dispatch('getUsuario');
          this.$router.push({name: 'usuario'});
        })
        .catch(erro => {
          this.erros.push(erro.response.data.message);
        })
      }
    }
  }
</script>

<style>

</style>