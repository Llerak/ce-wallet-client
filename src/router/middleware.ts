import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { roleAndUserGlobal } from '@/store/RolesAndPermission';
import { authService } from '@/services';

const authGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const roles = to.meta.roles as string[];
  roleAndUserGlobal.role = sessionStorage.getItem('Role') || 'User';
  try {
    const isValidToken = await authService.validationToken();
    if (!isValidToken) {
      next({ name: 'login' });
      return;
    } else {
      roleAndUserGlobal.role = isValidToken.response.role;
      roleAndUserGlobal.name = sessionStorage.getItem('Name') || '';
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
