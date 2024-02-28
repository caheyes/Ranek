<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div v-for="produto in produtos" :key="produto.id" class="produto">
          <router-link :to="{name: 'produto', params: {id: produto.id}}">
            <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].foto">
            <p class="preco">{{ $filtroPreco(produto.preco) }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p class="descricao">{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"/>
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
        <p class="sem-resultados">Busca sem resultados. Tente buscar por outro termo.</p>
      </div>
      <PaginaCarregando  v-else key="carregando"/>
    </transition>
  </section>
</template>

<script>
  import ProdutosPaginar from "@/components/ProdutosPaginar.vue";
  import ProdutoService from "@/services/ProdutoService";
  import { serialize } from "@/utils/helpers";

  export default {
    name: "ProdutosLista",
    data() {
      return {
        produtos: null,
        produtosPorPagina: 9,
        produtosTotal: 0
      }
    },
    components: {
      ProdutosPaginar
    },
    created() {
      this.getProdutos();
    },
    computed: {
      url() {
        const query = serialize(this.$route.query);
        return `?_limit=${this.produtosPorPagina}${query}`; //limitando a trazer apenas 10 itens ao pesquisar
      }
    },
    methods: {
      getProdutos() {
        this.produtos = null;

        window.setTimeout(() => {
          ProdutoService.getProdutos(this.url)
          .then(res => {
            this.produtosTotal = Number(res.headers["x-total-count"]);
            this.produtos = res.data;
          })
        }, 1500);
      }
    },
    watch: {
      url() {
        this.getProdutos();
      }
    }
  }
</script>

<style scoped>
  .produtos-container {
    max-width: 1000px;
    margin: 0 auto;
  }
  .produtos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin: 30px;
  }
  .produto {
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
    padding: 10px;
    background: #fff;
    border-radius: 4px;
    transition: all 0.2s; /*animação em segundos*/
  }

  .produto:hover {
    box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
    transform: scale(1.1); /*aumenta o item*/
    position: relative;
    z-index: 1;
  }

  .produto img {
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .titulo {
    margin-bottom: 10px;
  }

  .preco {
    font-weight: bold;
    color: #e80;
  }

  .sem-resultados {
    text-align: center;
  }
</style>