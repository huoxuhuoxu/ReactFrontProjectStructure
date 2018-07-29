const HtmlWebpackPlugin =   require('html-webpack-plugin');
const CleanWebpackPlugin =  require('clean-webpack-plugin');
const path =                require('path');
const config =              require("../config");

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
        new CleanWebpackPlugin([config.PUBLIC_NAME]),
        new HtmlWebpackPlugin({
            title: config.PAGE_TITLE,
            template: config.PAGE_TIMELATE
        })
    ]
};


module.exports = pro;
