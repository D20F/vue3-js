import { login, adminUserInfoOwn } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { ElMessage } from 'element-plus'
import {
    root,
    err,
    componentList
} from '@/router/routerConfig'

const getDefaultState = () => {
    return {
        token: getToken('admin_token'),
        userId: getToken('userId'),
        name: '',
        avatar: '',
        routerOption: [], // router 路由
        btnGroup: [] // 按钮权限数组

    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, data) => {
        state.token = data
    },
    SET_USERID: (state, data) => {
        state.userId = data
    },
    SET_NAME: (state, data) => {
        state.name = data
    },
    SET_AVATAR: (state, data) => {
        state.avatar = data
    },
    CHANGE_ROUTER: (state, data) => {
        state.routerOption = data
    },
    SET_BTN: (state, data) => {
        state.btnGroup = data
    }
}

const actions = {
    // 登陆
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(res => {
                console.log('login', res)
                commit('SET_TOKEN', res.token.accessToken)
                setToken('admin_token', res.token.accessToken)
                commit('SET_USERID', res.token.userId)
                setToken('userId', res.token.userId)

                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取账号信息  同时肩负判断token是否过期
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            adminUserInfoOwn().then(res => {
                if (!res) {
                    return reject('验证失败，请重新登录')
                }
                console.log('getInfo', res);
                
                // 按钮权限控制 

                let btn = [];
                for (const item of res.buttons) {
                    btn.push(item.identify)
                }
                commit('SET_BTN', btn)

                // 获取权限路由
                let searchIndex = (i) => {
                    for (const item of componentList) {
                        if (item.title == i) {
                            return item.component;
                        }
                    }
                }

                // 只支持一层嵌套 2层需修改
                let routerArr = [];
                for (const item of res.permissionVOList) {
                    let obj = {}
                    obj.path = item.menuPath;
                    obj.name = item.menuPath.split('/')[1];
                    obj.meta = {
                        title: item.name,
                        icon: item.icon
                    };
                    obj.component = searchIndex(obj.name);
                    obj.redirect = item.menuPath + '/' + item.children[0].menuPath;
                    let arr = []
                    for (const i of item.children) {
                        let c = {}
                        c.path = i.menuPath;
                        c.name = i.menuPath;
                        c.meta = {
                            title: i.name,
                            icon: i.icon
                        };
                        c.component = searchIndex(c.name);


                        // 最好不要做成侧边栏 不显示的页面 做成页面内组件就好
                        if(c.name == 'goods/specifications'){
                            c.hidden = true;
                        }
                        arr.push(c);
                    }
                    obj.children = arr;
                    routerArr.push(obj)
                }
      
                // root 账户 
                // commit('CHANGE_ROUTER', root)
                // 正常权限
                commit('CHANGE_ROUTER', [...routerArr, ...err])
                const { name } = res
                commit('SET_NAME', name)
                // 没有头像空 默认
                commit('SET_AVATAR', require('@/assets/avater.png'))
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 废弃
    getBtn({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            if (state.btnGroup.indexOf(data) == -1) {
                ElMessage.error('没有此按钮权限')
                return 
            } else {
                return resolve()
            }
        })
    },
    // 账号登出
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            removeToken('userId')
            removeToken('admin_token')
            resetRouter()
            commit('RESET_STATE')
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

