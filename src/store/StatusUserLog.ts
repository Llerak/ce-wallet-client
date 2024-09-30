import { reactive } from 'vue';

export const StatusUserLog = reactive({
  name: '',
  role: 'User',
  token: '',
});

export function clearStatusUserLog() {
  StatusUserLog.name = '';
  StatusUserLog.role = 'User';
  StatusUserLog.token = '';
}
