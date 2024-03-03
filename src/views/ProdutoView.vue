<template>
  <section>
    <div v-if="produto" class="produto">
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="(foto, i) in produto.fotos" :key="i">
          <img :src="foto.src" :alt="foto.titulo">
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="preco">{{ $filtroPreco(produto.preco) }}</p>
        <p class="descricao">{{ produto.descricao }}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">
          <div>
            <button class="btn" v-if="!finalizar" @click="finalizar = true">Comprar</button>
            <FinalizarCompra :produto="produto" v-else/>
          </div>
        </transition>
        <button class="btn btn-disabled" disabled v-else>Produto Vendido</button>
      </div>
    </div>
    <PaginaCarregando v-else/>
  </section>
</template>

<script>
  import ProdutoService from "@/services/ProdutoService";
  import FinalizarCompra from "@/components/FinalizarCompra.vue";

  export default {
    name: "ProdutoView",
    components: {
      FinalizarCompra
    },
    props: ['id'],
    data() {
      return {
        produto: null,
        finalizar: false
      }
    },
    created() {
      this.getProduto();
    },
    methods: {
      getProduto(){
        ProdutoService.getProdutos(this.id)
        .then(res => {
          this.produto = res.data;
        })
      }
    }
  }
</script>

<style scoped>
  .produto {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    max-width: 900px;
    padding: 60px 20px;
    margin: 0 auto;
  }

  .preco {
    color: #e80;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 40px;
  }

  .fotos {
    grid-row: 1 / 3; /*vai ocupar 2 linhas*/
  }

  .info {
    position: sticky; /* para quando dar o scroll isso fique posicionado e fixo*/
    top: 20px;
  }

  .descricao {
    font-size: 1.2rem;
  }
  
  img {
    margin-bottom: 30px;
    box-shadow: 0 4px 8px rgba(30, 60, 90, .2);
    border-radius: 4px;
  }

  .btn {
    margin-top: 60px;
    width: 200px;
  }

  @media screen and (max-width: 500px) {
    .produto {
      grid-template-columns: 1fr;
    }
    .fotos {
      grid-row: 2; /*passando para a coluna debaixo*/
    }
    .info {
      position: initial;
    }
  }

</style>