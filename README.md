#### react项目结构初始化
##### v3.1.0

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
	webpack		version > 4
	ruby		version > 2 (需要sass/compass才需要此环境)
	git

##### public (可以配置) 由 npm run build 打包后生成
	index.html: 		生产环境的首页
	dist:			js/css/pic等存放目录, 物理路径为 '/dist'

##### static 前端开发目录
	config: 			项目构建文件
	script: 			初始化脚本
	src: 				开发源文件
	config.js: 			统一配置文件
	
##### config.js
	PORT: 				webpack热更新服务器使用的开发环境端口号, 默认 8000
	PUBLIC_NAME: 			对外公开资源目录的名称, 默认 public
	PIC_AND_FONT_LIMIT: 		打包时图片/字体大小的限制, 默认 10000
	PAGE_TITLE:			页面标题
	PAGE_TIMELATE:			生成生产环境index.html页面的模版页面

##### config
	webpack.dev.config.js	开发环境配置
	webpack.pro.config.js	生产环境打包配置
	webpack.dll.config.js	动态链接库配置文件
	
	
##### script
	initial_project.sh: 	项目初始化脚本 (需要使用sass/compass时执行)
	
	
##### src
	sass: 				scss文件目录
	resource: 			图片/字体等资源目录
	js:
		modules: 		组件目录
		libs: 			工具文件目录
			base.js: 	常见问题处理
		views: 			页面目录
			router.js: 	路由文件
		index.js: 		主程序入口
		status: 		状态管理
			action.js: 	动作文件
			status.js: 	状态组件文件
			reducer.js: 	动作处理器文件
			store.js: 	存储器文件
	index.html: 			首页
	config.rb:			npm run sass 的配置文件
				
	
		
##### 指令
	在项目根目录下执行
	npm start: 		启用开发服务器, 默认监听 8000 端口
	npm run build: 		生产环境打包 
	npm run dll		动态链接库生成
	npm run sass: 		安装ruby/sass/compass环境才能运行,不需要可无视/删除

	dev、pro 环境运行的js包都依赖于 dll, 在运行 start、build 之前请优先运行 dll


##### 访问
	浏览器: 			location:8000
	移动端: 			私网ip:8000


##### 其他
	.babelrc:		语法转换配置
	.eslintrc: 		js格式规范
	.gitignore: 		过滤提交
	jsconfig.json:		vs code 配置文件


##### 注意
	js支持：				stage-0(es2015，es2016, es2017, async/await, decorator, do)
	打包格式支持: 			js/scss/css/png/jpg/jpeg/gif/eot/ttf/woff/woff2/svg/svgz
	图片/字体 打包限制:		10000字节 (可配置)

	webpack.dev.config.js 中sass打包注释了,有需要就打开,并且修改sass/main.min.scss内引入子文件的方式

##### 相关
> [redux,异步动作处理使用中间件: react-middleware-async](https://github.com/huoxuhuoxu/redux-middleware-async)
>
> [脚手架: react-structure-app](https://github.com/huoxuhuoxu/react-structure-app)



