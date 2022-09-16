/*
 * @Author: zhangyao
 * @Date: 2022-01-19 11:08:08
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-02 17:46:13
 */
/** 
 * @method logOut 登出
 * @method login 登录
 * @method getUserInfo 获取用户信息
 * **/
import UserService from "@service/services/user-service";
import {
    getStorage,
    setStorage,
    clearStorage
} from '@utils/auth/storage';
import {
    resetRouter
} from '@/router'
const user = {
    state: {
        token: getStorage('token'),
        userInfo: null,
        roles: []
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_ROLES(state, roles) {
            state.roles = roles
        },
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        login({
            commit
        }, params) {
            return new Promise((resolve, reject) => {
                UserService.login(params).then((res) => {
                    let {
                        token
                    } = res.data
                    commit('SET_TOKEN', token);
                    setStorage('token', token);
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getUserInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                UserService.userInfo({
                    token: state.token
                }).then(res => {
                    let {
                        roles
                    } = res.data
                    commit('SET_ROLES', roles)
                    commit('SET_USERINFO', res.data)
                    resolve(res.data)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        logOut({
            commit
        }) {
            //请求登出接口清理localStorage的信息
            return new Promise((resolve, reject) => {
                UserService.logOut().then(res => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', [])
                    commit('SET_USERINFO', null)
                    clearStorage()
                    resetRouter()
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        resetToken({
            commit
        }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', [])
                commit('SET_USERINFO', null)
                clearStorage()
                resolve()
            })
        }
    }
}
export default user