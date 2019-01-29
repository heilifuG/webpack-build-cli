const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // mode: 'production',
    // mode: 'development',
    mode: 'none',
    entry: {
        main1: './src/js/main1.js',
        main2: './src/js/main2.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index1.html',
            template: './src/index1.html',
            chunks: ['vue','main1']
        }),
        new htmlWebpackPlugin({
            filename: 'index2.html',
            template: './src/index2.html',
            chunks: ['vue','main2']
        }),
    ],
    optimization: {
        splitChunks: {
            // config common.js
            cacheGroups: {
                vue: {
                    name: 'vue',
                    test: /vue\.js/,
                    chunks: 'initial'
                }
            }
        }
    }
}