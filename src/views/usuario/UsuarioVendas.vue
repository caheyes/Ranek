<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div class="produtos-wrapper" v-for="(venda, i) in vendas" :key="i">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor"><span>Comprador: </span>{{ venda.comprador_id }}</p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ProdutoItem from '@/components/ProdutoItem.vue';
  import TransacaoService from '@/services/TransacaoService';
  import { mapState } from 'vuex';

  export default {
    name: 'UsuarioVendas',
    components: {
      ProdutoItem
    },
    data() {
      return {
        vendas: null
      }
    },
    created() {
      if(this.login) {
        this.getVendas();
      }
    },
    computed: {
      ...mapState(['usuario', 'login'])
    },
    methods: {
      getVendas() {
        TransacaoService.getTransacaoVendedor()
        .then(res => {
          this.vendas = res.data;
        })
      }
    },
    watch: {
      login() {
        this.getVendas();
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

  .entrega {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
    grid-gap: 20px;
    margin-bottom: 60px;
  }

  h3 {
    margin: 0;
    justify-self: end;
  }

  @media screen and (max-width: 500px) {
    .entrega {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
    h3 {
      margin: 0;
      justify-self: start;
    }
  }
</style>