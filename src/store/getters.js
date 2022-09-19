/*
 * @Author: zhangyao
 * @Date: 2022-01-19 16:48:28
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-09-19 09:59:49
 */
const getters = {
  token: (state) => state.user.token,
  roles: (state) => state.user.roles,
  userInfo: (state) => state.user.userInfo,
  permission_routes: (state) => {
    return state.permission.routes
      .filter((route) => !route.hidden)
      .map((route) => {
        if (route?.children?.length === 1 && route?.children[0]?.meta?.affix) {
          route = route?.children[0]
        }
        return route
      })
  }
}
export default getters
