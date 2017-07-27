
let path = require('path');

const PUBLIC_NAME = require('../config').PUBLIC_NAME;
const PIC_AND_FONT_LIMIT = require('../config').PIC_AND_FONT_LIMIT;

module.exports = {
    entry: {
        build: ["./static/src/js/app.js"],
    },
    output: {
        path: path.resolve(__dirname, `../../${PUBLIC_NAME}/dist`),
        publicPath: './',
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime']
                }
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
    }
};

