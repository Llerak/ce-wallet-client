import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authGuard from '@/router/Middleware';
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
      roleAndUserGlobal.name = '';
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
    component: HomeView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
  {
    path: '/register',
    name: 'register',
    component: HomeView,
    meta: { roles: roles.admin },
    beforeEnter: authGuard,
  },
  {
    path: '/users',
    name: 'users',
    component: HomeView,
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

export default router;
