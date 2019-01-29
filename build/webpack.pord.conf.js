const cleanWebpackPlugin = require('clean-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')

const website = {
    publicPaht: 'http://localhost:8888'
}

const base = require('./webpack.base.conf.js')
let pluginsArray = [];
for (let i in base.plugins) {
    pluginsArray.push(base.plugins[i])
}
pluginsArray.push(new cleanWebpackPlugin(['dist']))
pluginsArray.push(new extractTextPlugin('css/index.css'))


module.exports = {
    mode: base.mode,
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
                test: /\.(png|jpg|gif|jpeg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 500, //only <500B to base64 and wite in js
                        publicPath:'../imgs/',
                        outputPath: 'imgs'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'react', 'env'
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                // tract .less
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            "last 3 versions",
                                            "ie >= 10",
                                            "ie_mob >= 10",
                                            "ff >= 30",
                                            "chrome >= 34",
                                            "safari >= 6",
                                            "ios >= 6",
                                            "android >= 4.4"
                                        ]
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },
    optimization: base.optimization
}