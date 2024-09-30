import { StatusUserLog } from './StatusUserLog';

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
  const rolePermissions = permissionsRole[StatusUserLog.role] || [];
  return rolePermissions.includes(permission);
}
