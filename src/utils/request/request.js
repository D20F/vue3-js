


import axios from 'axios'
import { ElMessage } from 'element-plus'

import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router/index'

// 使用线上地址 去vue.config配置 反向代理的地址
// 本地测试地址
const URL = 'http://192.168.2.135:8008/'
// 在 vueConfig 内配置了反向代理
// const URL = ''

const service = axios.create({
    baseURL: URL,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000,
    headers: {
        'tokenType': 1,
    }
})

// 发送前拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = getToken('admin_token')
            config.headers['userId'] = getToken('userId')
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

service.interceptors.response.use(

    response => {
        const res = response.data

        // console.log('axiosuse', res)

        // 状态码报错
        if (res.status !== 200) {
            if (res.status == 401) {
                ElMessage({
                    message: '登陆过期请重新登录',
                    type: 'error',
                    duration: 3 * 1000
                })
                store.dispatch('user/logout')
                router.replace('/login')
            } else {
                ElMessage({
                    message: res.message || 'Error',
                    type: 'error',
                    duration: 3 * 1000
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // console.log(error)
        ElMessage({
            message: error.response.data.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export const postData = (url, data) => {
    return new Promise((resolve, reject) => {
        service({ url, data, method: 'post' })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

export const getData = (url, params) => {
    return new Promise((resolve, reject) => {
        service({ url, params, method: 'get' })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
export const putData = (url, data) => {
    return new Promise((resolve, reject) => {
        service({ url, data, method: 'put' })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
export const deleteData = (url, params) => {
    return new Promise((resolve, reject) => {
        service({ url, params, method: 'DELETE' })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
