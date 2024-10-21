import { reactive } from 'vue';
import { RoleType } from '@/interfaces/dto';

export const roleAndUserGlobal = reactive({
  role: '',
  name: '',
});

export const permissions = {
  viewDashboard: 'viewDashboard',
  editSettings: 'editSettings',
};

export const permissionsRole: { [p: string]: string[] } = {
  [RoleType.Administrator]: [permissions.viewDashboard, permissions.editSettings],
  [RoleType.Supervisor]: [],
  [RoleType.Assessor]: [],
};

export function hasPermission(permission: string) {
  const rolePermissions = permissionsRole[roleAndUserGlobal.role] || [];
  return rolePermissions.includes(permission);
}
