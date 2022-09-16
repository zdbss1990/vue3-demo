/*
 * @Author: zhangyao
 * @Date: 2022-01-20 17:38:48
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-01-24 16:02:22
 */
import {
    ElNotification
} from 'element-plus'
let notify = null;
export const el_notify = (option) => {
    if (notify) {
        notify.close();
        notify = null
    }
    notify = ElNotification(option);
}

const notifyPlugin = {
    install: (app) => {
        app.config.globalProperties.$notifyMsg = el_notify;
    }
}

export default notifyPlugin