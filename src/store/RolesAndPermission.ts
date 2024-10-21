import { reactive } from 'vue';
import { RoleType } from '@/interfaces/dto';

export const roleAndUserGlobal = reactive({
  role: '',
  name: '',
});

export const permissions = {
  viewDashboard: 'viewDashboard',
  viewFund: 'viewFund',
  viewRegister: 'viewRegister',
  viewUser: 'viewUser',
  viewSettings: 'viewSettings',
  viewAll: 'viewAll',
  add: 'add',
  actionTransf: 'actionTransf',
  actionDeposit: 'actionDeposit',
  actionWithdrawl: 'actionWithdrawl',
  actionEdit: 'actionEdit',
  actionDelete: 'actionDelete',
};

export const permissionsRole: { [p: string]: string[] } = {
  [RoleType.Administrator]: [
    permissions.viewDashboard,
    permissions.viewFund,
    permissions.viewRegister,
    permissions.viewUser,
    permissions.viewSettings,
    permissions.viewAll,
    permissions.add,
    permissions.actionDelete,
    permissions.actionDeposit,
    permissions.actionEdit,
    permissions.actionTransf,
    permissions.actionWithdrawl,
  ],
  [RoleType.Supervisor]: [
    permissions.viewFund,
    permissions.viewRegister,
    permissions.viewAll,
    permissions.actionTransf,
    permissions.actionWithdrawl,
  ],
  [RoleType.Assessor]: [
    permissions.viewFund,
    permissions.viewAll,
    permissions.actionWithdrawl,
    permissions.viewRegister,
  ],
};

export function hasPermission(permission: string) {
  const rolePermissions = permissionsRole[roleAndUserGlobal.role] || [];
  return rolePermissions.includes(permission);
}
