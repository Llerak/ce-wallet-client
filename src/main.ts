import { createApp } from 'vue';
import './assets/tailwind.css';
import './assets/main.css';
import './assets/base.css';
import App from './App.vue';
import router from './router';
import hasPermission from './directives/hasPermission';

const app = createApp(App);

app.directive('hasPermission', hasPermission);
app.use(router).mount('#app');
