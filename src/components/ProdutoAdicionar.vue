<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome">
    <label for="preco">Preco (R$)</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco">
    <label for="fotos">Fotos</label>
    <input id="fotos" name="fotos" type="file" ref="fotos" multiple>
    <label for="descricao">Descrição</label>
    <textarea id="descricao" name="descricao" v-model="produto.descricao"></textarea>
    <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto">
  </form>
</template>

<script>
  import ProdutoService from '@/services/ProdutoService';

  export default {
    name: 'ProdutoAdicionar',
    data() {
      return {
        produto: {
          nome: '',
          preco: '',
          fotos: null,
          descricao: '',
          vendido: "false"
        }
      }
    },
    methods: {
      formatarProduto() {
        const form = new FormData();

        const files = this.$refs.fotos.files; //pegando os arquivos
        for(let i = 0; i < files.length; i++) {
          form.append(files[i].name, files[i]); //pego o nome do arquivo, e mando o arquivo
        }

        form.append("nome", this.produto.nome);
        form.append("preco", this.produto.preco);
        form.append("descricao", this.produto.descricao);
        form.append("vendido", this.produto.vendido);
        form.append("usuario_id", this.$store.state.usuario.id);

        return form;
      },

      adicionarProduto() {
        const produto = this.formatarProduto();
        ProdutoService.postProdutos(produto)
        .then(() => {
          this.$store.dispatch('getUsuarioProdutos');
        })
      }
    }
  }
</script>

<style scoped>
  .adicionar-produto {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
  }

  .btn {
    grid-column: 2;
  }
</style>