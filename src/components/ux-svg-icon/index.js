/*
 * @Author: zhangyao
 * @Date: 2022-02-09 13:43:45
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-03 11:14:03
 */
const req=require.context('./../../icons/svg',false,/\.svg$/);
const requireAll=requireContext=>requireContext.keys().map(requireContext);
requireAll(req)