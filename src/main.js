import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

//IMPORTS COMPONENTS
import PaginaCarregando from '../src/components/PaginaCarregando';
import ErroNotificacao from '../src/components/ErroNotificacao';
app.component('PaginaCarregando', PaginaCarregando);
app.component('ErroNotificacao', ErroNotificacao);

//IMPORT UTILS
import { filtroPreco } from './utils/helpers';
app.config.globalProperties.$filtroPreco = filtroPreco;

app.use(store).use(router).mount('#app');
