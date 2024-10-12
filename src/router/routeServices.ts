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
};

export default routeServices;
