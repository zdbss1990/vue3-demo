/*
 * @Author: zhangyao
 * @Date: 2022-01-15 13:58:45
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-01-18 10:12:41
 */
import {
    ElMessage
} from 'element-plus';
let msg = null;
export const el_message = (option) => {
    if (msg) {
        msg.close();
        msg = null;
    }
    msg = ElMessage(option)
}
const msgPlugin = {
    install: (app) => {
        app.config.globalProperties.$elMsg = el_message;
    }
};
export default msgPlugin