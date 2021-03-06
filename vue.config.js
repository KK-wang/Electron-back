const path = require('path')
function resolve (dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/assets/icons')) // 处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    devServer: { // 处理跨域问题
        proxy: {
            '/api': {
                target: 'http://120.77.83.8:8085',// 将要请求的后端接口ip+port
                changeOrigin: true,
                // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                ws: true,// 开启webSocket
                pathRewrite: {
                    '^/api': '',// 替换成target中的地址
                }
            }
        },
        port: 8999, // 端口
    },
}
