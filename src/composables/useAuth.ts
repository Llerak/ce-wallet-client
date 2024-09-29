import { ref } from 'vue';
import { roles, permissions } from '@/store/RolesAndPermission';

const userRole = ref(sessionStorage.getItem('role') || roles.user);

export function useAuth() {
  const hasPermission = (permission: string) => {
    const rolePermissions = {
      [roles.admin]: [permissions.viewDashboard, permissions.editSettings],
      [roles.user]: [permissions.viewDashboard],
    };

    return rolePermissions[userRole.value as keyof typeof roles].includes(
      permission
    );
  };

  return { hasPermission };
}
