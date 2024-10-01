import { reactive } from 'vue';

export const roleAndUserGlobal = reactive({
  role: 'User',
  name: '',
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
  const rolePermissions = permissionsRole[roleAndUserGlobal.role] || [];
  return rolePermissions.includes(permission);
}
