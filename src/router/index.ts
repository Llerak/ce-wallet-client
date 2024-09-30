import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authGuard from '@/services/Middleware';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import UnauthorizedView from '@/views/UnauthorizedView.vue';
import { roles } from '@/store/RolesAndPermission';
import { clearStatusUserLog } from '@/store/StatusUserLog';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    beforeEnter: () => {
      clearStatusUserLog();
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
