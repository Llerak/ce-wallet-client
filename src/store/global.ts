import { reactive } from 'vue';

export const status = reactive({ isApiLoading: false, isPageLoaded: false });
export const statusSideBar = reactive({ visible: false });
