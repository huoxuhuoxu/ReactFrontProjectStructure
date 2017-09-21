
// webpack 热加载服务的端口号
const PORT = require('../config').PORT;

var WebpackDevServer = require('webpack-dev-server');
var webpack          = require('webpack');
var path             = require('path');

// 引入现有 webpack 设置
var config = require(path.join(__dirname, './webpack.dev.config.js'));
config.entry.build.unshift(
    `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
    'webpack/hot/only-dev-server'
);

// 服务设置
var server   = new WebpackDevServer(webpack(config), {
    // HotModuleReplacementPlugin 配合启用热更新
    hot: true,
    // 公开内网访问
    disableHostCheck: true,
    // output.publicPath 设置一样
    publicPath: "/dist/",
    stats: { colors: true }
    //historyApiFallback: true
});

server.listen(PORT);
