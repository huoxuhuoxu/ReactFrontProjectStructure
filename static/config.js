
// 配置文件

var config = {};

// webpack 热加载服务的端口号
config.PORT = 8000;

// 对外公开的资源目录的目录名称
config.PUBLIC_NAME = 'public';

// 打包时字体图片的限制 8K
config.PIC_AND_FONT_LIMIT = 8192;

// page title
config.PAGE_TITLE = "测试";

// html template
config.PAGE_TIMELATE = "./static/src/index.html";


module.exports = config;

