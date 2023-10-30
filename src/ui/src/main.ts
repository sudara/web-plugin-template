import { createApp } from 'vue'
import App from '@/App.vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import '@/sass/_variables.scss';
import "@/sass/style.scss";
import "./RegisterPluginFunctions"
import { createPinia } from 'pinia';
import VueFeather from 'vue-feather';

const app = createApp(App);
const pinia = createPinia();

app.use(ContextMenu);
app.use(pinia);
app.component(VueFeather.name, VueFeather);

app.mount('#app');

