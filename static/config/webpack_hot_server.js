/*eslint-disable no-console */

var WebpackDevServer = require('webpack-dev-server');
var webpack          = require('webpack');
var path             = require('path');

// 引入现有 webpack 设置
var config = require(path.join(__dirname, './webpack.dev.config.js'));

// webpack 热加载服务的端口号
var port = 8000;

// 在 webpack config 中将需要的模块的 entry 中增加下面两条设置
// 采用的 only-dev-server 而不是 dev-server 是为了在语法出错的时候不会重载浏览器页面
config.entry.build.unshift(
    `webpack-dev-server/client?http://0.0.0.0:${port}`,
    'webpack/hot/only-dev-server'
);

// 我的 babel loader 位于第一个位置，所以这儿直接采用 [0] 来重新设置此 loader
// 加上了 react-hot 来处理 babel 编译后的源码
// 由于改用  react-transform，所以下面设置也作废
// config.module.loaders[0].loader = 'react-hot!babel';

// publicPath 必须设置，这是在现有 HTML 页面中嵌入 script的 路径
// 如果不设置，热加载生成的一些内部脚本将会无处依存
config.output.publicPath = `/dist/`;

// 在 webpack 配置中增加热加载插件
// 这个必须有，否则即使下面的 hot: true 设置了也没用
// 但是也要注意一下源配置文件中是否已经设置过了，不要重复设置
// 我的建议是原配置中不要牵扯任何跟热加载有关的东西，保持纯净
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var compiler = webpack(config);

// 下面是具体的服务设置
var server   = new WebpackDevServer(compiler, {
    // 这个显然必须有
    // 需要注意的是这儿的这个属性和命令行中的同名属性有所区别
    // 这儿设置了并不会自动增加 HotModuleReplacementPlugin
    // 所以上面才需要设置一个
    hot: true,
    // 只对外公开一个内网ip
    // public: '192.168.8.133:8000',
    disableHostCheck: true,
    // 注意：这个属性也必须设置，且与上面的 publicPath 中的相应位置一致
    // 否则也不起作用
    publicPath: "/dist/",

    stats: { colors: true }
    //historyApiFallback: true
});
server.listen(port);
