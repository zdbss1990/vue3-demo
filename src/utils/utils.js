/*
 * @Author: zhangyao
 * @Date: 2022-08-04 14:05:35
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-04 14:43:19
 */
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
export const formatDate=(value,pattern = 'YYYY-MM-DD HH:mm:ss')=>{
    if(value === '') return '暂无';
    return moment(value).format(pattern);
}