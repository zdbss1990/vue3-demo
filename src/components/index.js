/*
 * @Author: zhangyao
 * @Date: 2022-02-11 16:10:38
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-03 11:05:31
 */
const components = require.context('@/components', true, /\.vue|.jsx$/);
export default{
    install(app){
        components.keys().forEach(component => {
            const component_config = components(component);
            const component_name = component.split("/")[1];
            app.component(component_name, component_config.default || component_config)
        });
    }
}
