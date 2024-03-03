<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, i) in compras" :key="i">
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor"><span>Vendedor: </span>{{ compra.vendedor_id }}</p>
        </ProdutoItem>
      </div>
    </div>
  </section>
</template>

<script>
  import ProdutoItem from '@/components/ProdutoItem.vue';
  import TransacaoService from '@/services/TransacaoService';
  import { mapState } from 'vuex';

  export default {
    name: 'UsuarioCompras',
    components: {
      ProdutoItem
    },
    data() {
      return {
        compras: null
      }
    },
    created() {
      if(this.login) {
        this.getCompras();
      }
    },
    computed: {
      ...mapState(['usuario', 'login'])
    },
    methods: {
      getCompras() {
        TransacaoService.getTransacao()
        .then(res => {
          this.compras = res.data;
        })
      }
    },
    watch: {
      login() {
        this.getCompras();
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-bottom: 20px;
  }
  .produto-wrapper {
    margin-bottom: 40px;
  }

  .vendedor span {
    color: #e80;
  }
</style>