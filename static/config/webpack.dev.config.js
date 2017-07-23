
let path = require('path');

module.exports = {
    entry: {
        build: ["../src/js/app.js"],
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
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',                        
                    'ruby-sass-loader?compass=1'
                ]
            },
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
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // =.= 就一个入口,用不上
        // new global.webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',               
        //     filename: '[name].bundle.js',   
        //     minChunks: 4                   
        // })
    ]
};


