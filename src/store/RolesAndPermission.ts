import { reactive } from 'vue';

export const roleGlobal = reactive({
  role: 'User',
});
export const roles = {
  admin: 'Administrador',
  user: 'User',
};

export const permissions = {
  viewDashboard: 'viewDashboard',
  editSettings: 'editSettings',
};

export const permissionsRole = {
  [roles.admin]: [permissions.viewDashboard, permissions.editSettings],
  [roles.user]: [],
};

export function hasPermission(permission: string) {
  const rolePermissions = permissionsRole[roleGlobal.role] || [];
  return rolePermissions.includes(permission);
}
