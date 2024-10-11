const routeServices = {
  auth: {
    validate: '/auth',
    login: '/auth/login',
    refresh: '/auth/refresh',
    register: '/auth/refresh',
  },
  funds: {
    list: '/fund',
    fund: (id: string) => `/fund/${id}`,
    user: (id: string) => `/fund/user/${id}`,
    create: '/fund/create',
    transfer: '/fund/transfer',
    withdrawal: '/fund/withdrawal',
    deposit: '/fund/deposit',
    attachUser: (id: string, userid: string) =>
      `/fund/attach-user/${id}/${userid}`,
  },
};

export default routeServices;
