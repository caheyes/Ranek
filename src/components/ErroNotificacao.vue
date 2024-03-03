<template>
  <transition mode="out-in">
    <ul class="erro" v-if="erros.length > 0">
      <li v-for="(erro, i) in erros" :key="i" v-html="erro"></li>
    </ul>
  </transition>
</template>

<script>
  export default {
    name: "ErroNotificacao",
    props: {
      erros: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .erro {
    margin: 20px auto;
  }

  .erro li {
    color: #e80;
    text-align: center;
  }
</style>