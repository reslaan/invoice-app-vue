import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './stores'

//import './assets/main.css'
import '@/scss/style.scss'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
