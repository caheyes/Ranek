<template>
  <section>
    <UsuarioForm :desabilitar="true">
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
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
    methods: {
      atualizarUsuario() {
        let id = this.$store.state.usuario.id;
        let usuario = this.$store.state.usuario;

        UsuarioService.putUsuario(usuario, id)
        .then(() => {
          this.$store.dispatch('getUsuario', id);
          this.$router.push({name: 'usuario'});
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style>

</style>