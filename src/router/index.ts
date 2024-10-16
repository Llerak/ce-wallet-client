import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authGuard from '@/router/middleware';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import FundView from '@/views/fundsView/FundView.vue';
import UnauthorizedView from '@/views/UnauthorizedView.vue';
import { roleAndUserGlobal, roles } from '@/store/RolesAndPermission';
import { statusApi, statusSideBar } from '@/store/global';
import FundLogsView from '@/views/fundLogsView/FundLogsView.vue';
import UsersView from '@/views/usersView/UsersView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    beforeEnter: () => {
      sessionStorage.clear();
      roleAndUserGlobal.role = 'User';
      roleAndUserGlobal.name = '';
      statusSideBar.visible = false;
    },
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: HomeView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
  {
    path: '/funds',
    name: 'funds',
    component: FundView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
  {
    path: '/register',
    name: 'register',
    component: FundLogsView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
  {
    path: '/settings',
    name: 'settings',
    component: HomeView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
  {
    path: '/profile',
    name: 'profile',
    component: HomeView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Gancho de navegación global para establecer statusApi.isLoading
router.beforeEach((to, from, next) => {
  statusApi.isLoading = true;
  next();
});

router.afterEach(() => {
  statusApi.isLoading = false;
});

// Redirección a la ruta anterior si la ruta no existe
router.onError((error, to, from) => {
  if (error.type === 'navigation') {
    router.push(from.fullPath);
  }
});

export default router;
