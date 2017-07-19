#### 类react前端项目结构	
##### v 1.0.0

##### 通过命令行安装
	sudo npm install react-structure-app -g
	react-structure-app [project-name]

	cd static/script
	./initial_project.sh

	注: 命令行工具 react-structure-app 源: https://github.com/huoxuhuoxu/react-structure-app
	注: ./initial_project.sh 项目依赖初始化脚本, 需要可执行权限: sudo chmod u+x ./initial_project.sh
	注: 最新版本可以从源package中获得 如果安装不是最新版本, 运行: sudo npm install react-structure-app@[最新版本号] -g


##### 环境依赖
	nodeJs v7.7.8
	ruby   v2.0.0


##### static
	静态资源目录
	build: 项目构建文件目录
	public: 对外公开资源目录
	script: 脚本目录
	src: 源文件
	
##### build
	webpack_hot_server.js
		开发服务器配置,提供模块热插拔,移动端同步
	
	webpack.dev.config.js
		开发环境打包配置,提供map-source
		
	webpack.pro.config.js
		生产环境打包配置
		
	js默认支持拓展: es2015, stage-0, react, transform-runtime
	其他打包支持: scss/css/png/jpg/jpeg/gif/eot/ttf/woff/woff2/svg/svgz
	图片字体打包默认限制: 10000字节
	
##### public
	dist: 打包后的文件目录
	index.html: 默认首页

##### script
	initial_project.sh: 项目初始化脚本
	
##### src
	sass: scss文件目录
	lib: 第三方资源
	resource: 图片/字体等资源目录
	js:
		components: 组件目录
		tools: 工具文件目录
			frontBase.js: 前端方法
			reactMiddleware.js: react相关中间件
			tools.js: 工具方法
			touch.js: 触摸方法
		views: 页面组件目录
		app.js: 主程序入口
		router.js: 路由文件
		actions: reudx目录
			action.js: 动作文件
			status.js: 状态组件文件
			reducer.js: 动作处理器文件
			store.js: 存储器文件
				
	
		
##### 指令
	在项目根目录下执行
	npm start: 启动开发服务器
	npm run build: 生产环境打包 


##### 使用
	npm start
	默认使用 8000 端口号
	浏览器: location:8000 访问
	移动端: 内网ip:8000 访问


##### 其他
	.eslintrc: js格式规范
	.gitignore: 本地文件,屏蔽上传





