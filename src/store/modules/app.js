/*
 * @Author: zhangyao
 * @Date: 2022-02-22 11:26:23
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-19 09:55:39
 */
import { setStorage, getStorage } from '@utils/auth/storage'
const findRoute = (routes, currentRoute) => {
  let { route } = currentRoute
  return routes.find((item) => item.name == route.name)
}
const app = {
  state: {
    tagNavList: [],
    dark: JSON.parse(getStorage('dark')),
    layoutType: getStorage('layoutType') || 'default',
    collapse: JSON.parse(getStorage('collapse')) || false,
    search: JSON.parse(getStorage('search')) || false,
    routerList: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          icon: 'home',
          title: '主页',
          affix: true
        }
      }
    ],
    rootTransitionName: ''
  },
  mutations: {
    THEME_MUTATION(state, val) {
      state.dark = val
    },
    LAYOUT_MUTATION(state, type) {
      state.layoutType = type
    },
    COLLAPSE_MUTATION(state, flag) {
      state.collapse = flag
    },
    SEARCH_MUTATION(state, val) {
      state.search = val
    },
    SET_ROUTE_MUTATION(state, obj) {
      let hasRoute = findRoute(state.routerList, obj)
      if (!hasRoute) {
        state.routerList.push(obj.route)
      }
    },
    FILTER_ROUTES_LIST(state, route) {
      if (route.flag == 'default') {
        state.routerList = state.routerList.filter(
          (item) => item.name !== route.currentRoute.name
        )
      } else if (route.flag == 'all') {
        state.routerList = state.routerList.filter(
          (item) => item.name == route.currentRoute.name
        )
      } else {
        state.routerList = state.routerList.filter(
          (item) => item.name == route.currentRoute.name || item.name == 'Home'
        )
      }
    }
  },
  actions: {
    toggleThemeActions({ commit }, val) {
      commit('THEME_MUTATION', val)
      setStorage('dark', val)
    },
    changeLayoutActions({ commit }, type) {
      commit('LAYOUT_MUTATION', type)
      setStorage('layoutType', type)
    },
    toggleCollapseActions({ commit }, flag) {
      commit('COLLAPSE_MUTATION', flag)
      setStorage('collapse', flag)
    },
    toggleSearchActions({ commit }, val) {
      commit('SEARCH_MUTATION', val)
      setStorage('search', val)
    },
    routeListActions({ commit }, obj) {
      commit('SET_ROUTE_MUTATION', obj)
    },
    filterRouteActions({ commit }, route) {
      commit('FILTER_ROUTES_LIST', route)
    }
  }
}
export default app
