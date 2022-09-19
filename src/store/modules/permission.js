/*
 * @Author: zhangyao
 * @Date: 2022-01-24 09:49:05
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-19 10:02:20
 */
import { defaultRoutes, asyncRoutes } from '@/router'
import { isExternal } from '@utils/validate/validate'
import path from 'path'
/**
 * @param {*} route
 * @param {*} roles
 * @return {*}
 */
function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 *
 *
 * @param {*} routes
 * @param {*} roles
 * @return {*}
 * 1.判断是否带权限标识如果带就去验证权限
 * 2.如果不带说明可以直接访问
 */
function filterRoutes(routes, roles, baseUrl = '/') {
  return routes
    .filter((route) => {
      if (hasPermission(route, roles)) {
        if (route.children && route.children.length) {
          route.children = filterRoutes(route.children, roles)
        }
        return true
      }
    })
    .map((route) => {
      if (route.path !== '*' && !isExternal(route.path)) {
        route.path = path.resolve(baseUrl, route.path)
      }
      route.fullPath = route.path
      if (route.children) {
        route.children = filterRoutes(route.children, roles, route.fullPath)
      }
      return route
    })
}

const permission = {
  state: {
    routes: []
  },
  mutations: {
    SET_ROUTES(state, routes) {
      state.routes = routes
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise(async (resolve) => {
        const accessedRoutes = await filterRoutes(
          [...defaultRoutes, ...asyncRoutes],
          roles
        )
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
export default permission
