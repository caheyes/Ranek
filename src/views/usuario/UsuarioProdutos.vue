<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutoAdicionar/>
    <h2>Seus Produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, i) in usuario_produtos" :key="i">
        <ProdutoItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">Deletar</button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
  import ProdutoAdicionar from '@/components/ProdutoAdicionar.vue';
  import ProdutoItem from '@/components/ProdutoItem.vue';
  import { mapState, mapActions } from 'vuex';
  import ProdutoService from '@/services/ProdutoService';

  export default {
    name: 'UsuarioProdutos',
    components: {
      ProdutoAdicionar,
      ProdutoItem
    },
    created() {
      if(this.login) {
        //só puxar quando o usuario estiver logado
        this.getUsuarioProdutos();
      }
    },
    computed: {
      ...mapState(['login', 'usuario', 'usuario_produtos']), //esse é o jeito mais bacana de puxar o state, mutations, actions... Ao invés de chamar assim  this.$store.state.login
    },
    methods: {
      ...mapActions(['getUsuarioProdutos']), //puxando acao para chamar a função normalmente, ex: this.getUsuarioProdutos() sem precisar chamar assim: this.$store.dispatch("getUsuarioProdutos")

      deletarProduto(id) {
        const confirmar = window.confirm("Deseja remover este produto?");

        if(confirmar) {
          ProdutoService.deletarProduto(id)
          .then(() => {
            this.getUsuarioProdutos();
          })
        }
      }
    },
    watch: {
      login() {
        this.getUsuarioProdutos();
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-bottom: 20px;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }

  .list-enter-active,
  .list-leave-active {
    transition: all .3s;
  }

  .deletar {
    position: absolute;
    top: 0px;
    right: 0px;
    background: url("../../assets/remove.svg") no-repeat center center;
    width: 24px;
    height: 24px;
    text-indent: -140px; /*para tirar o texto da frente*/
    overflow: hidden;
    cursor: pointer;
    border: none;
  }
</style>