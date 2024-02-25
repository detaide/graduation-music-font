import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import  getVant  from './plugins';
import router from './router/index.js';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPersist from 'pinia-plugin-persist'
// import Bottom from '@/components/Bottom/Bottom.vue';
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(ElementPlus);
getVant(app)

//注册icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册全局组件
// app.component('Bottom', Bottom);
app.mount('#app')
