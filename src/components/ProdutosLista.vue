<template>
  <section class="produtos-container">
    <div v-for="produto in produtos" :key="produto.id">
      <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].foto">
      <h2 class="titulo">{{ produto.nome }}</h2>
      <p class="preco">{{ produto.preco }}</p>
      <p class="descricao">{{ produto.descricao }}</p>
    </div>
  </section>
</template>

<script>
  import ProdutoService from "@/services/ProdutoService";

  export default {
    data() {
      return {
        produtos: []
      }
    },
    created() {
      this.getProdutos();
    },
    methods: {
      getProdutos() {
        ProdutoService.getProdutos()
        .then(res => {
          this.produtos = res.data;
        })
      }
    }
  }
</script>

<style>

</style>