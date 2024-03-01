<template>
  <div class="produto" v-if="produto">
    <router-link class="produto-img" :to="{name: 'produto', params: {id: produto.id}}">
      <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
      <p>Ver Produto</p>
    </router-link>
    <div class="info">
      <p class="preco">{{ $filtroPreco(produto.preco) }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProdutoItem',
    props: {
      produto: {
        type: Object
      }
    }
  } 
</script>

<style scoped>
  .produto {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr; 
    grid-gap: 20px;
    margin-bottom: 40px;
    position: relative;
  }

  .info {
    align-self: end;
  }

  .produto-img {
    border-radius: 4px;
    overflow: hidden; /* esconde oq fica fora do tamanho, ai não corre o risco de esticar img */
    height: 100px;
  }

  .titulo {
    margin-bottom: 20px;
  }
</style>