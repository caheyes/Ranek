<template>
  <section>
    <h2>Endereço de Envio</h2>
    <ErroNotificacao :erros="erros"/>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<script>
  import UsuarioForm from '@/components/UsuarioForm.vue';
  import TransacaoService from '@/services/TransacaoService.js';
  import { mapState } from 'vuex';

  export default {
    name: 'FinalizarCompra',
    components: {
      UsuarioForm
    },
    props: {
      produto: {
        type: Object
      }
    },
    data() {
      return {
        erros: []
      }
    },
    computed: {
      ...mapState(['usuario']),
      compra() {
        return {
          comprador_id: this.usuario.email,
          vendedor_id: this.produto.usuario_id,
          produto: this.produto,
          endereco: {
            cep: this.usuario.cep,
            rua: this.usuario.rua,
            numero: this.usuario.numero,
            bairro: this.usuario.bairro,
            cidade: this.usuario.cidade,
            estado: this.usuario.estado,
          }
        }
      }
    },
    methods: {
      criarTransacao() {
        return TransacaoService.postTransacao(this.compra)
        .then(() => {
          this.$router.push({name: "compras"});
        })
      },
      
      async criarUsuario() {
        try {
          await this.$store.dispatch("criarUsuario", this.$store.state.usuario); //acao vuex
          await this.$store.dispatch("logarUsuario", this.$store.state.usuario); 
          await this.$store.dispatch("getUsuario");  //puxando usuarios
          await this.criarTransacao();
        } catch (erro) {
          this.erros.push(erro.response.data.message);
        }
      },

      finalizarCompra() {
        this.erros = [];
        
        if(this.$store.state.login) {
          this.criarTransacao();
        } else {
          this.criarUsuario();
        }
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .btn {
    background: #e80;
  }
</style>