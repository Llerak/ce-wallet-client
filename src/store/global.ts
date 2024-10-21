import { reactive } from 'vue';

export const status = reactive({ isApiLoading: false, isPageLoaded: false });
export const statusSideBar = reactive({ visible: false });
export const longDate = (date: string) =>
  new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
