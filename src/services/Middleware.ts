import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userRole = sessionStorage.getItem('role') || '';
  const roles = to.meta.roles as string[];
  if (roles && !roles.includes(userRole)) {
    next({ name: 'unauthorized' });
  } else {
    next();
  }
};

export default authGuard;
