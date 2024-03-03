import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import ProdutoView from '../views/ProdutoView.vue';
import UsuarioView from '../views/usuario/UsuarioView.vue';
import UsuarioProdutos from '../views/usuario/UsuarioProdutos.vue';
import UsuarioCompras from '../views/usuario/UsuarioCompras.vue';
import UsuarioVendas from '../views/usuario/UsuarioVendas.vue';
import UsuarioEditar from '../views/usuario/UsuarioEditar.vue';

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
    component: UsuarioView,
    //para fazer navigation guard, onde não permite certas rotas em algumas situações
    meta: {
      login: true,
    },
    //rotas filhas children, o router-view fica dentro fo componente pai
    children: [
      {
        path: '',
        name: 'usuario',
        component: UsuarioProdutos,
      },
      {
        path: 'compras',
        name: 'compras',
        component: UsuarioCompras,
      },
      {
        path: 'vendas',
        name: 'vendas',
        component: UsuarioVendas,
      },
      {
        path: 'editar',
        name: 'usuario-editar',
        component: UsuarioEditar,
      },
    ],
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

//para fazer navigation guard, onde não permite certas rotas em algumas situações
router.beforeEach((to, from, next) => {
  //antes de cada router entrar
  //se login for true
  if (to.matched.some((record) => record.meta.login)) {
    //se não tiver token manda para o login
    if (!window.localStorage.token) {
      next('/login');
    } else {
      next(); //permite ir para a rota
    }
  } else {
    next(); //permite ir para a rota se não exigir login
  }
});

export default router;
