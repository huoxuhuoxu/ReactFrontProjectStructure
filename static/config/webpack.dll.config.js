const webpack = require("webpack");
const path = require("path");
const config = require("../config");

module.exports = {
    mode: "production",
    entry: {
        react: [
            'react', 
            'react-dom', 
            'react-redux', 
            'react-router', 
            'react-router-dom',
            'redux',
            'react-middleware-async',
            'lodash',
            'axios',
            'antd'
        ]
    },
    output: {
        // 动态链接库输出的文件名称
        filename: './dist/[name].dll.js',
        // 输出路径
        path: path.resolve(__dirname, `../../${config.PUBLIC_NAME}`),
        // 链接库(react.dll.js)输出方式 默认'var'形式赋给变量 b
        libraryTarget: 'var',               
        // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
        library: '_dll_[name]_[hash]'       
    },
    plugins: [
        new webpack.DllPlugin({
            // path 指定manifest文件的输出路径
            path: path.join(__dirname, `../../${config.PUBLIC_NAME}`, 'dist', '[name].manifest.json'),
            // 和library 一致，输出的manifest.json中的name值
            name: '_dll_[name]_[hash]', 
        })
    ]
}

