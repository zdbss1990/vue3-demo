/*
 * @Author: zhangyao
 * @Date: 2022-01-14 13:22:10
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-02-18 16:39:30
 */
import axios from "axios";
import {
    getStorage
} from "@utils/auth/storage";
import {
    ElMessageBox
} from 'element-plus';
import router from "@/router";
import {
    el_notify
} from "@utils/notify/notify"
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 3000
})

let whiteList = ['/login', '/register'];
const methods = ['get', 'post', 'put', 'delete'];
methods.forEach(method => {
    service[method] = (url, params) => {
        let key = method === 'post' ? 'data' : 'params'
        return service({
            url: url,
            [key]: params,
            method
        })
    }
})

service.interceptors.request.use(config => {
    let token = getStorage('token');
    if (token) {
        config.headers['token'] = token
    }
    return config
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use(res => {
    let {
        data
    } = res
    return data;
}, err => {
    console.log(err)
    if (err.message.includes('Network Error')) {
        el_notify({
            type: 'error',
            message: '网络错误',
            title: '提示'
        })
        return Promise.reject(err)
    } 
    if (err.message.includes('timeout')) {
        el_notify({
            type: 'error',
            message: '请求超时',
            title: '提示'
        })
        return Promise.reject(err)
    }
    if (err.response) {
        if (err?.response?.status === 401 && !whiteList.includes(router.currentRoute.fullPath)) {
            ElMessageBox({
                title: '登录已过期',
                message: '很抱歉，登录已过期，请重新登录',
                type: 'error',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showCancelButton: true,
                callback: (action) => {
                    if (action === 'confirm') {
                        //触发loginout
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }
                }
            })
        }
        return Promise.reject(err)
    }else{
        el_notify({
            type: 'error',
            message: err.message,
            title: '提示'
        })
        return Promise.reject(err)
    }
})

export default service;