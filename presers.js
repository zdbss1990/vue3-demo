/*
 * @Author: zhangyao
 * @Date: 2022-08-02 17:08:40
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-03 10:17:31
 */
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver, VueUseComponentsResolver } = require('unplugin-vue-components/resolvers');
module.exports=[
    AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        // eslint-disable-next-line no-sparse-arrays
        imports: ["vue", "vuex", "vue-router"],
        // 生成相应的自动导入json文件。
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: true, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // imports 指定组件所在位置，默认为 src/components
        dirs: ["src/components/", "src/views/"],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver(),
          VueUseComponentsResolver()
        ],
    })
]