/*
 * @Author: zhangyao
 * @Date: 2022-02-09 15:12:54
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-02-09 15:12:54
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}