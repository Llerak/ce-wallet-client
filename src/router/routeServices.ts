const routeServices = {
  auth: {
    validate: '/auth',
    login: '/auth/login',
    refresh: '/auth/refresh',
    register: '/auth/register',
  },
  funds: {
    list: (page: number, size: number) => `/fund?page=${page}&size=${size}`,
    fund: (id: string) => `/fund/${id}`,
    user: (id: string) => `/fund/user/${id}`,
    create: '/fund/create',
    transfer: '/fund/transfer',
    withdrawal: '/fund/withdrawal',
    deposit: '/fund/deposit',
    attachUser: (id: string, userid: string) => `/fund/attach-user/${id}/${userid}`,
  },
  currencies: {
    list: (includeFunds: boolean) => `/currency/?funds=${includeFunds}`,
    create: '/currency',
    currency: (id: string) => `/currency/${id}`,
    informalForeignExchange: '/currency/informal-foreign-exchange',
  },
  logs: (page: number, size: number) => `/logs/funds?page=${page}&limit=${size}`,
  roles: {
    list: '/role',
    find: (id: string) => `/role/${id}`,
  },
  users: {
    root: '/user',
    list: (page: number, size: number, role: boolean) => `/user?page=${page}&size=${size}&role=${role}`,
    resetPassword: '/user/reset-password',
    delete: (id: string) => `/user/${id}`,
    find: (id?: string, name?: string, email?: string) => {
      let route = `/user/find-by?`;
      let cond = true;

      if (id !== undefined) {
        cond = false;
        route += `id=${id}`;
      }
      if (name !== undefined) {
        route += `${cond ? '' : '&'}name=${name}`;
        cond = false;
      }
      if (email !== undefined) {
        route += `${cond ? '' : '&'}email=${email}`;
      }

      return route;
    },
  },
};

export default routeServices;
