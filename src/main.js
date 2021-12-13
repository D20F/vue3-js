import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets


import '@/styles/index.scss' // global css
import '@/permission' // permission control

// import '@/icons' // icon

import ic from '@/icons' // icon


const app = createApp(App)

ic(app)


app.config.productionTip = false

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')

export default app
