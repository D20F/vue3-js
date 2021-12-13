import { createRouter, createWebHashHistory } from 'vue-router'
import { basis } from './routerConfig'


const createCustomRouter = () => createRouter({
  // mode: 'history', // require service support
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: basis
})

const router = createCustomRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createCustomRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
