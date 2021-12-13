import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import store from './store'
import router from './router'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import SvgIcon from '@/components/SvgIcon'// svg component



const app = createApp(App)

app.config.productionTip = false

// register globally
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})
app.use(store)
app.use(router)
app.mount('#app')

export default app
