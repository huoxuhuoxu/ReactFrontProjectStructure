
let path = require('path');
let PORT = require('../config').PORT;
let PIC_AND_FONT_LIMIT = require('../config').PIC_AND_FONT_LIMIT;
let webpack = require('webpack');

let openBrowserWebpackPlugin = require('open-browser-webpack-plugin');


module.exports = {
    entry: {
       build: [ "../src/js/app.js" ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].min.js'
    },
    devtool: '#eval-source-map',
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
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
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: PIC_AND_FONT_LIMIT
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserWebpackPlugin({url : `http://localhost:${PORT}`})
    ]
};


