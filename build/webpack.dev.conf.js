const extractTextPlugin = require('extract-text-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const base = require('./webpack.base.conf.js')

let pluginsArray = [];

for (let i in base.plugins) {
    pluginsArray.push(base.plugins[i])
}

pluginsArray.push(new cleanWebpackPlugin(['dist']))

module.exports = {
    mode: 'development',
    // mode: 'production',
    // mode: 'development',
    entry: base.entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        // static config
        // publicPath: website.publicPaht
    },
    plugins: pluginsArray,
    module: {
        rules: [{
            // tract .less
            test: /\.less$/,
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader'
                }
            ]
        }, {
            test: /\.(png|jpg|gif|jpeg)/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 500, //only <500B to base64 and wite in js
                    publicPath: '../imgs/',
                    outputPath: 'imgs'
                }
            }]
        }, {
            test: /\.(htm|html)$/i,
            use: ['html-withimg-loader']
        }]
    },
    optimization: base.optimization,
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        compress: true,
        port: 8888,
        open: true
    }
}