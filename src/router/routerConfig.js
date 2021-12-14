import Layout from '@/layout'
/**
 * children.length                子菜单： 长度超过 1 才会出现子路线
 * hidden: true                   侧边栏隐藏： 默认为假 , 为真在侧边栏不显示
 * redirect: noRedirect           重定向： noRedirect 不重定向
 * name:'router-name'             路由名称：
 * meta : {

    }
 */
// 基础路由
export const basis = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '用户', icon: 'el-icon-menu' }
        }]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    }
]

// 报错模块 放在异步路由里,解决刷新404问题
export const err = [
    { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]


// 通用模块 --- 废弃 使用权限动态路由
export const other = [
    {
        path: '/authority',
        component: Layout,
        redirect: '/authority/userGroup',
        name: 'authority',
        meta: { title: '权限分配', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'userGroup',
                name: 'userGroup',
                component: () => import('@/views/authority/userGroup/index'),
                meta: { title: '用户组', icon: 'table' }
            },
            {
                path: 'manageUsers',
                name: 'manageUsers',
                component: () => import('@/views/authority/manageUsers/index'),
                meta: { title: '管理用户', icon: 'table' }
            },
            {
                path: 'assignAuthority',
                name: 'assignAuthority',
                component: () => import('@/views/authority/assignAuthority/index'),
                meta: { title: '管理权限', icon: 'table' }
            },
        ]
    },

]
// root 账户 --- 废弃 使用权限动态路由
export const root = [...err, ...other]
export const componentList = [
    { title: 'authority', component: Layout },
    { title: 'userGroup', component: () => import('@/views/authority/userGroup/index') },
    { title: 'manageUsers', component: () => import('@/views/authority/manageUsers/index') },
    { title: 'assignAuthority', component: () => import('@/views/authority/assignAuthority/index') },

    { title: 'otherConfig', component: Layout },
    { title: 'Swiper', component: () => import('@/views/otherConfig/Swiper/index') },
]
