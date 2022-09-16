/*
 * @Author: zhangyao
 * @Date: 2022-01-14 15:24:40
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-01-21 14:08:24
 */
import user from '@service/api/user';
import service from '@utils/request/axios'
class UserService {
    login(params) {
        return service.post(user.login, params)
    }
    logOut() {
        return service.post(user.logOut)
    }
    userInfo(params) {
        return service.get(user.userInfo, params)
    }
}
export default new UserService;