const HtmlWebpackPlugin =   require('html-webpack-plugin');
const webpack =             require('webpack');
const path =                require('path');
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const config =              require("../config");

const dev = {
    mode: "development",
    entry: {
        main: "./static/src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, `../../${config.PUBLIC_NAME}`),
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
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: true } }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    { loader: 'babel-loader', options: { cacheDirectory: true } }
                ]
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
        new HtmlWebpackPlugin({
            title: config.PAGE_TITLE,
            template: config.PAGE_TIMELATE
        }),
        new openBrowserWebpackPlugin({url : `http://localhost:${config.PORT}`})
    ]
};


module.exports = dev;
