import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authGuard from '@/router/middleware';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import FundView from '@/views/fundsView/FundView.vue';
import UnauthorizedView from '@/views/UnauthorizedView.vue';
import { status, statusSideBar } from '@/store/global';
import FundLogsView from '@/views/fundLogsView/FundLogsView.vue';
import UsersView from '@/views/usersView/UsersView.vue';
import { RoleType } from '@/interfaces/dto';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    beforeEnter: () => {
      sessionStorage.clear();
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
    meta: { roles: RoleType.Administrator },
    beforeEnter: authGuard,
  },
  {
    path: '/funds',
    name: 'funds',
    component: FundView,
    meta: { roles: [RoleType.Supervisor, RoleType.Assessor, RoleType.Administrator] },
    beforeEnter: authGuard,
  },
  {
    path: '/register',
    name: 'register',
    component: FundLogsView,
    meta: { roles: [RoleType.Administrator, RoleType.Supervisor, RoleType.Assessor] },
    beforeEnter: authGuard,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
    meta: { roles: RoleType.Administrator },
    beforeEnter: authGuard,
  },
  {
    path: '/settings',
    name: 'settings',
    component: HomeView,
    meta: { roles: [RoleType.Administrator, RoleType.Supervisor, RoleType.Assessor] },
    beforeEnter: authGuard,
  },
  {
    path: '/profile',
    name: 'profile',
    component: HomeView,
    meta: { roles: [RoleType.Administrator, RoleType.Supervisor, RoleType.Assessor] },
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Gancho de navegación global para establecer statusApi.isLoading
router.beforeEach((to, from, next) => {
  status.isApiLoading = true;
  next();
});

router.afterEach(() => {
  status.isApiLoading = false;
});

// Redirección a la ruta anterior si la ruta no existe
router.onError((error, to, from) => {
  if (error.type === 'navigation') {
    router.push(from.fullPath);
  }
});

export default router;
