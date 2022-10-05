import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './stores'
import i18n from './i18n/i18n'

//import './assets/main.css'
import '@/scss/style.scss'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
// import  '@/scss/style-ar.scss'

const app = createApp(App)

//app.use(createPinia())
app.use(router)
app.use(store)
app.use(i18n)

app.mount('#app')
