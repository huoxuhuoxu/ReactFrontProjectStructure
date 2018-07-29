const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const ET = require("extract-text-webpack-plugin");

const path = require('path');
const config = require("../config");

const pro = {
    mode: "production",
    entry: {
        main: "./static/src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, `../../${config.PUBLIC_NAME}`),
        filename: './dist/[name].[hash:32].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ET.extract({ fallback: 'style-loader', use: 'css-loader' })
                // use: [
                //     { loader: 'style-loader' },
                //     { loader: 'css-loader', options: { modules: true } }
                // ]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    { loader: 'babel-loader', options: { cacheDirectory: true } }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: config.PIC_AND_FONT_LIMIT
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ET({
            filename: "./dist/style.min.[chunkhash:32].css"
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false,        //不需要格式化
                    comments: false         //不保留注释
                },
                compress: {
                    warnings: false,        // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true,     // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true,    // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true       // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: config.PAGE_TITLE,
            hash: true,
            template: config.PAGE_TIMELATE
        })
    ]
};


module.exports = pro;
