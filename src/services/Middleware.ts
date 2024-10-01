import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import usersServices from './usersServices';
import { roleAndUserGlobal } from '@/store/RolesAndPermission';

const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const roles = to.meta.roles as string[];
  roleAndUserGlobal.role = sessionStorage.getItem('Role') || 'User';
  try {
    const isValidToken = await usersServices.validationToken();

    if (!isValidToken) {
      next({ name: 'login' });
      return;
    } else {
      roleAndUserGlobal.name = isValidToken.data.name;
      roleAndUserGlobal.role = isValidToken.data.role;
    }

    if (roles && !roles.includes(roleAndUserGlobal.role)) {
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
