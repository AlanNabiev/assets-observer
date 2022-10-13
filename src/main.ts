import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import vClickOutside from 'click-outside-vue3'

import '@/assets/styles/main.css'
import 'virtual:windi.css'

const app = createApp(App)

app.use(router).use(vClickOutside)
app.mount('#app')
