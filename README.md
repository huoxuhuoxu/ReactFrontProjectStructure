#### react项目结构初始化
##### v 2.0.0

##### 通过命令行安装
	sudo npm install react-structure-app -g
	react-structure-app [project-name]

	如果需要使用sass/compass则需要执行下面的命令
	cd static/script
	./initial_project.sh

	如果需要测试打包后的结果
	sudo npm install http-server -g
	在项目根目录下执行 http-server, 浏览器中访问指令输出的地址

	注: ./initial_project.sh 项目依赖初始化脚本, 需要可执行权限: sudo chmod u+x ./initial_project.sh
	注: 最新版本可以从源package中获得 如果安装不是最新版本, 运行: sudo npm install react-structure-app@[最新版本号] -g
	注: 命令行安装只适用于 mac OS 


##### 环境依赖
	nodeJs v7.7.8
	ruby   v2.0.0 (需要sass/compass才需要此环境)
	git

##### public (可以配置)
	静态资源目录: 		由 npm run build 打包后生成
	index.html: 		压缩后的首页
	dist:			js/css/pic等存放目录, 物理路径为 '/dist'

##### static
	开发目录
	config: 		项目构建文件目录
	script: 		脚本目录
	src: 			开发源文件
	config.js: 		项目配置文件
	
##### config.js
	PORT: 			webpack热更新服务器使用的开发环境端口号, 默认 8000
	PUBLIC_NAME: 		对外公开资源目录的名称, 默认 public
	PIC_AND_FONT_LIMIT: 	打包时图片/字体大小的限制, 默认 10000

##### config
	webpack_hot_server.js	开发服务器配置,提供模块热插拔,移动端同步
	
	webpack.dev.config.js	开发环境打包配置,提供map-source
		
	webpack.pro.config.js	生产环境打包配置
		
	
	
##### script
	initial_project.sh: 	项目初始化脚本 (需要使用sass/compass时执行)
	build.js: 		生产环境打包脚本, npm run build 的源码
	
##### src
	sass: 			scss文件目录
	lib: 			第三方资源
	resource: 		图片/字体等资源目录
	js:
		modules: 	组件目录
		tools: 		工具文件目录
			base.js: 	常见问题处理
		views: 		页面组件目录
		app.js: 	主程序入口
		router.js: 	路由文件
		status: 	reudx目录
			action.js: 	动作文件
			status.js: 	状态组件文件
			reducer.js: 	动作处理器文件
			store.js: 	存储器文件
	index.html: 		首页
				
	
		
##### 指令
	在项目根目录下执行
	npm start: 	启用开发服务器
	npm run build: 	生产环境打包 
	npm run sass: 	安装ruby/sass/compass环境才能运行,不需要可无视/删除
	npm run pro: 	npm run build 的一部分,负责运行webpack.pro.config.js,可以自行修改


##### 使用
	npm start:	默认使用 8000 端口号
	浏览器: 		location:8000 	访问
	移动端: 		私网ip:8000 	访问


##### 其他
	.babelrc:	语法转换配置
	.eslintrc: 	js格式规范
	.gitignore: 	过滤提交
	favicon.ico:	默认icon
	jsconfig.json:	vs code 配置文件


##### 注意
	js支持：			es2015，es2016, es2017, async/await, decorator, do
	打包支持: 		js/scss/css/png/jpg/jpeg/gif/eot/ttf/woff/woff2/svg/svgz
	图片/字体 打包限制: 	10000字节 (可配置)

	webpack 中sass打包注释了,有需要就打开,目前存在一个bug,css写错后compass会产生报错, 中断webpack的监听, 需要重启webpack
	cross-env: 添加windows兼容
		如果mac运行出现问题,可将package.json-scripts中cross-env删除

##### 相关
> [redux,异步动作处理使用中间件: react-middleware-async](https://github.com/huoxuhuoxu/redux-middleware-async)
>
> [脚手架: react-structure-app](https://github.com/huoxuhuoxu/react-structure-app)



