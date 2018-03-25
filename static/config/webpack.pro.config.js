
let path = require('path');
let PUBLIC_NAME = require('../config').PUBLIC_NAME;
let PIC_AND_FONT_LIMIT = require('../config').PIC_AND_FONT_LIMIT;
let ET = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        build: ["./static/src/js/app.js"],
    },
    output: {
        path: path.resolve(__dirname, `../../${PUBLIC_NAME}/dist`),
        publicPath: './dist',
        filename: '[name].min.[chunkhash:32].js'
    },
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
                use: ET.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
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
        new ET({
            filename: "style.min.[chunkhash:32].css"
        })
    ]
};

