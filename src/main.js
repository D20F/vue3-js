import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets


import '@/icons'
import '@/styles/index.scss' // global css
import '@/permission'
import directive from '@/directive'
import components from '@/components'




const app = createApp(App)
app.config.productionTip = false




app.use(directive)
app.use(components)
app.use(ElementPlus, { locale: zhCn })
app.use(store)
app.use(router)
app.mount('#app')

export default app
