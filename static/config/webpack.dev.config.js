
let path = require('path');
let openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const PORT = require('../config').PORT;
const PIC_AND_FONT_LIMIT = require('../config').PIC_AND_FONT_LIMIT;

module.exports = {
    entry: {
       build: [ "../src/js/app.js" ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: '[name].min.js'
    },
    devtool: '#eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
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
        new openBrowserWebpackPlugin({url : `http://localhost:${PORT}`})
        // =.= 就一个入口,用不上
        // new global.webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',               
        //     filename: '[name].bundle.js',   
        //     minChunks: 4                   
        // })
    ]
};


