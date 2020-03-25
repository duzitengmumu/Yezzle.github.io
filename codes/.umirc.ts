import { defineConfig } from 'umi';
const path = require('path')

export default defineConfig({
    antd: false,
    ignoreMomentLocale: true,
    layout: false,
    mock: false,
    // outputPath: 'dist',
    chainWebpack:(config, {webpack}) => {
        //优化antd icon全部引入问题
        config.resolve.alias.set('@ant-design/icons/lib/dist$', path.resolve(__dirname, 'utils/antdIcon.js'))
    },
    ui: false
})