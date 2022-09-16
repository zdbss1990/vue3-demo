/*
 * @Author: zhangyao
 * @Date: 2022-01-21 14:45:54
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-13 15:17:43
 */
import {
    getStorage
} from "@utils/auth/storage";
import store from '@store';
import router from './router';
import { el_message } from '@utils/message/message.js'
let whiteList = ['/login', '/register'];
router.beforeEach(async (to, from, next) => {
    let token = getStorage('token');
    if (token) {
        //如果有token判断是否在登录页如果是继续下一步
        if (to.path === "/login") {
            next({
                path: '/'
            })
        } else {
            /**
             * 1.获取后台权限数组，如果有权限跳到下一页,如果没有权限数组证明后台权限数组不存在,
             * 先去用用户的token去请求请求后，重新添加router，跳到下一页当前要去的路由.
             * 2.如果出错跳转到登录页，清除用户所有localStorage**/
            let hasRole = store.getters.roles && store.getters.roles.length
            if (hasRole) {
                next()
            } else {
                //利用用户token去请求用户消息
                try {
                    /** 1.根据用户token拉取最新用户信息**/
                    let {
                        roles
                    } = await store.dispatch("getUserInfo");
                    /** 2.根据获取权限信息筛选路由**/
                    let accessRoutes = [];
                    accessRoutes = await store.dispatch('generateRoutes', roles);
                    accessRoutes.forEach((item)=>{
                        router.addRoute(item)
                    })
                    next({
                        ...to,
                        replace: true
                    })
                } catch (err) {
                    /** 获取失败跳到登录页**/
                    await store.dispatch('resetToken');
                    el_message({
                        type:'error',
                        message:err,
                        title:'提示'
                    })
                    next(`/login?redirect=${to.path}`)
                }

            }
        }
    } else {
        // 没有token判断是否在白名单，如果不是跳到登录页，如果是那就在登录页或者注册页
        whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`)
    }
})