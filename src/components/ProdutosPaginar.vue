<template>
  <ul v-if="paginasTotal > 1">
    <router-link :to="{query: query(1)}">primeiro</router-link>
    <li v-for="pagina in paginas" :key="pagina">
      <router-link :to="{query: query(pagina)}" :class="{ 'rota-selecionada': isRotaSelecionada(pagina) }">{{pagina}}</router-link>
    </li>
    <router-link :to="{query: query(paginasTotal)}">último</router-link>
  </ul>
</template>

<script>
  export default {
    props: {
      produtosTotal: {
        type: Number,
        default: 1
      },
      produtosPorPagina: {
        type: Number,
        default: 1
      }
    },
    computed: {
      paginas() {
        const paginaAtual = Number(this.$route.query._page);
        const limiteTotalPaginas = 9;
        const paginasAnterioresDoSelecionado = Math.ceil(limiteTotalPaginas / 2);
        const total = this.paginasTotal;
        const pagesArray = [];

        for (let i = 1; i <= total; i++) {
          pagesArray.push(i);
        }

        //quando clicar no item, 2 por exemplo, vai mostrar a array [3, 4, 5...], menos paginasAnterioresDoSelecionado é para mostrar as paginas antes do 3 se tiver
        pagesArray.splice(0, paginaAtual - paginasAnterioresDoSelecionado); 
        
        pagesArray.splice(limiteTotalPaginas, total);
        
        return pagesArray;
      },

      paginasTotal() {
        const total = this.produtosTotal / this.produtosPorPagina;
        return total !== Infinity ? Math.ceil(total) : 0; // arredondar para cima, Infinity para evitar erros
      }
    },
    methods: {
      query(pagina) {
        //evitando erros quando for feito a pesquisa e fazer a paginação, fazendo a destruturação = http://localhost:8080/?q=celula + &_pagina=1
        return {
          ...this.$route.query,
          _page: pagina
        };
      },

      isRotaSelecionada(pagina) {
        return this.$route.query._page == pagina;
      }
    }
  }
</script>

<style scoped>
  ul {
    grid-column: 1/ -1;
  }

  li {
    display: inline-block;
  }

  li a {
    padding: 2px 8px;
    border-radius: 2px;
    margin: 4px;
  }

  li a:hover {
    background: #87f;
    color: #fff;
  }

  .rota-selecionada {
    background: #87f;
    color: #fff;
  }
</style>