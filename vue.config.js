/*
 * @Author: zhangyao
 * @Date: 2022-01-14 10:49:32
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-08-04 14:38:58
 */
const path = require('path');
const webpack=require('webpack');
const _resolve = (dir) => {
    return path.resolve(__dirname, dir)
}
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    pluginOptions: {
        windicss: {
    
        },
    },
    css: {
        //提取css文件
        extract: process.env.NODE_ENV === 'production',
        sourceMap: process.env.NODE_ENV === 'development',
        loaderOptions: {
            //配置全局的scss
            scss: {
                prependData: `
                   @import "~@css/main.scss";
                `
            }
        }
    },
    devServer: {
        socket: 'socket',
        port: 9527,
        hot: true,
        // proxy: {
        //   '/api': {
        //     target: target,
        //     changeOrigin: true,
        //     pathRewrite: {'^/api': '/api/gql'}
        //   },
        // }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', _resolve('src'))
            .set('@utils', _resolve('src/utils'))
            .set('@service', _resolve('src/service'))
            .set('@store', _resolve('src/store'))
            .set('@css', _resolve('src/assets/css'))
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons/svg')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/icons/svg'))
            .end()
            .use('file-loader')
            .loader('file-loader')
    },
    configureWebpack:{
        plugins:[
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|ja/)
        ]
        // plugins:[...require('./presers')]
    }
}