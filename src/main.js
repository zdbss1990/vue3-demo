import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "@/assets/css/reset.css";
import msgPlugin from '@utils/message/message';
import notifyPlugin from '@utils/notify/notify';
import ElementPlus from 'element-plus';
import components from '@/components';
import 'element-plus/dist/index.css'
import './permission';
import './components/ux-svg-icon';
import 'windi.css';
import './assets/css/index.scss';
const app=createApp(App);
app.use(store)
   .use(router)
   .use(ElementPlus)
   .use(msgPlugin)
   .use(notifyPlugin)
   .use(components)
   .mount('#app')
