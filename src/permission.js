import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { toRaw } from '@vue/reactivity'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)

    // 获取token 确认状态
    const hasToken = getToken('admin_token')

    if (hasToken) {
        // 登陆之后不允许进入 login 页
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // 获取用户信息 以及权限
                    await store.dispatch('user/getInfo')
                    // 添加路由
                    for (const item of toRaw(store.getters.routerOption)) {
                        router.addRoute(item)
                    }
                    next({ ...to, replace: true })
                } catch (error) {
                    // 删除缓存信息 重定向login
                    await store.dispatch('user/logout')
                    ElMessage.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        // 无token重定向
        // login 路径不用重定向
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // 重定向 login 页面
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
