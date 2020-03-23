import { defineConfig } from 'umi';

export default defineConfig({
    antd: false,
    //  注释掉 使用约定式路由
    //  routes: [{
    //     "path": "/",
    //     "component": '@/layouts/index.js',
    //     "routes": [{
    //         "path": "/",
    //         "exact": true,
    //         "component": '@/pages/index.js'
    //       },{
    //         "path": "/user",
    //         "exact": true,
    //         "component": '@/pages/user.tsx'
    //       }]
    // }]

    // 一下配置开启 ignoreMomentLocale选项即可
    // chainWebpack: (config, {webpack, env}) => {
    //     config.plugin('ContextReplacementPlugin').use(new webpack.ContextReplacementPlugin( /moment[/\\]locale$/,
    //         /zh-cn/,
    //     ))
    // },

});