const HtmlWebpackPlugin =           require('html-webpack-plugin');
const webpack =                     require('webpack');
const path =                        require('path');
const HtmlIncludeAssetsPlugin =     require("html-webpack-include-assets-plugin");
const ET =                          require("extract-text-webpack-plugin");
const openBrowserWebpackPlugin =    require('open-browser-webpack-plugin');
const config =                      require("../config");


// 打包后的静态资源目录
const public_path = path.resolve(__dirname, `../../${config.PUBLIC_NAME}`);

// dll动态链接库 缓存说明
const dll_manifest = path.resolve(public_path, "./dist/react.manifest.json");


const dev = {
    mode: "development",
    entry: {
        main: "./static/src/js/index.js"
    },
    output: {
        path: public_path,
        filename: './dist/[name].[hash:32].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: `./${config.PUBLIC_NAME}`,
        compress: true,
        hot: true,
        port: config.PORT,
        stats: "errors-only"
    },
    module: {
        rules: [
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',                        
            //         'ruby-sass-loader?compass=1'
            //     ]
            // },
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
        new webpack.HotModuleReplacementPlugin(),
        new ET({
            filename: "./dist/style.[chunkhash:32].css"
        }),
        new webpack.ProvidePlugin({
            '_': 'lodash',
            'axios': 'axios',
            'antd': 'antd'
        }),
        new webpack.DllReferencePlugin({
            manifest: require(dll_manifest)
        }),
        new HtmlWebpackPlugin({
            // 替换标题
            title: config.PAGE_TITLE,
            // 生成的文件名称
            filename: "index.html",
            template: config.PAGE_TIMELATE,
            // 需要引入的入口
            chunks: [ 'main' ],
            inlineSource: '.(js|css)$'
        }),
        new HtmlIncludeAssetsPlugin({
            // 添加的资源相对html的路径
            assets: [ './dist/react.dll.js' ], 
            // false 在其他资源的之前添加, true 在其他资源之后添加
            append: false 
        }),
        new openBrowserWebpackPlugin({url : `http://localhost:${config.PORT}`})
    ]
};


module.exports = dev;
