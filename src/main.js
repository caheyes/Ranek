import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

//IMPORTS COMPONENTS
import PaginaCarregando from '../src/components/PaginaCarregando';
app.component('PaginaCarregando', PaginaCarregando);

//IMPORT UTILS
import { filtroPreco } from './utils/helpers';
app.config.globalProperties.$filtroPreco = filtroPreco;

app.use(store).use(router).mount('#app');
