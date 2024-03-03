<template>
  <div id="app">
    <TheHeader/>
    <main id="main">
      <transition mode="out-in">
        <router-view/>
      </transition>
    </main>
    <TheFooter/>
  </div>  
</template>

<script>
  import TheHeader from "@/components/TheHeader.vue";
  import TheFooter from "@/components/TheFooter.vue";
  import LoginService from "@/services/LoginService";

  export default {
    components: {
      TheHeader,
      TheFooter
    },
    created() {
      //quando dar o f5 na pagina, para não ficar deslogando sempre se ainda tiver o token
      if(window.localStorage.token) {
        //valida se o token é real
        LoginService.validaToken()
        .then(() => {
          this.$store.dispatch("getUsuario"); //puxa os dados do usuario se tudo estiver ok
        })
        .catch(error => {
          console.log(error);
          window.localStorage.removeItem('token'); // caso der erro eu removo o token
        })
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body, ul, li, h1, h2, p {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }

  body {
    font-family: "Avenir", Arial, Helvetica, Arial, sans-serif;
    color: #345;
    background: url(./assets/pattern.svg) repeat;
  }

  a {
    color: #345;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  .btn {
    display: block;
    padding: 10px 30px;
    background: #87f;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: 1rem;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2); 
    transition: all 0.3s;
    border: none;
    font-family: "Avenir", Arial, Helvetica, Arial, sans-serif;
    cursor: pointer;
  }

  .btn:hover {
    background: #65d;
    transform: scale(1.1);
  }

  .btn-disabled,
  .btn-disabled:hover {
    background: #bbc;
    transform: scale(1);
  }

  /* deixando o footer lá embaixo, 100vh sempre será o tamanho da tela */
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  #main {
    flex: 1;
  }

  label {
    margin-bottom: 5px;
  }

  input, textarea {
    border-radius: 4px;
    border: 1px solid white;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
    transition: all 0.3s;
    font-size: 1rem;
    font-family: "Avenir", Arial, Helvetica, sans-serif;
    margin-bottom: 15px;
    width: 100%;
  }

  input:hover, input:focus, textarea:hover, textarea:focus {
    outline: none;
    box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
    border-color: #87f;
  }

  /*trasition na tag transition no html, animações*/ 

  .v-enter,
  .v-leave-to {
    opacity: 0;
  }

  .v-enter {
    transform: translate3d(0, -20px, 0);
  }

  .v-leave-to {
    transform: translate3d(0, 20px, 0);
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s;
  }
</style>
