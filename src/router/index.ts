import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authGuard from '@/services/Middleware';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import UnauthorizedView from '@/views/UnauthorizedView.vue';
import { roleAndUserGlobal, roles } from '@/store/RolesAndPermission';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    beforeEnter: () => {
      sessionStorage.clear();
      roleAndUserGlobal.role = 'User';
    },
  },
  {
    path: '/',
    name: 'unauthorized',
    component: UnauthorizedView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
