import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import ProdutoView from '../views/ProdutoView.vue';
import UsuarioView from '../views/usuario/UsuarioView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: ProdutoView,
    props: true,
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: UsuarioView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    //toda vez que mudar a rota dá um scrol para o topo
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

export default router;
