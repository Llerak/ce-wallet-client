import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import usersServices from './usersServices';
import { roleGlobal } from '@/store/RolesAndPermission';

const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const roles = to.meta.roles as string[];
  roleGlobal.role = sessionStorage.getItem('Role') || 'User';
  try {
    const isValidToken = await usersServices.validationToken();

    if (!isValidToken) {
      next({ name: 'login' });
      return;
    }

    if (roles && !roles.includes(roleGlobal.role)) {
      next({ name: 'unauthorized' });
    } else {
      next();
    }
  } catch (error) {
    console.error('Error during token validation:', error);
    next({ name: 'login' });
  }
};

export default authGuard;
