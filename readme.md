# WEBPACK-JQUERY-SCAFFOLD

## 简介
WEBPACK-JQUERY-SCAFFOLD  -- WebPack + JQuery简易脚手架，适用于追求较小体积SPA的场合

## 开发环境配置
1. 安装node.js & npm
node.js是一个基于Chrome  V8引擎的JavaScrip运行时，它是前端工程化的基础。npm是node.js的包管理工具。
- Windows用户

访问 [node.js官网](https://nodejs.org/zh-cn/) ，并下载安装包进行安装

- macOS用户
```
brew install node
```

- Ubuntu用户
```
sudo apt install nodejs
```


2. 安装git
- Windows用户请先下载安装 [msysgit](http://gitforwindows.org/) 。另外最好安装一个命令行模拟器，例如cygwin。
- macOS与Ubuntu默认已经安装。


3. 前端编辑器
提前准备好一个适用于前端开发编辑器或IDE。
推荐 JetBrains的 [WebStorm](https://www.jetbrains.com/webstorm/) 或 微软的 [VSCode](https://code.visualstudio.com/)。

4. 克隆源码
源码使用git进行版本控制，托管在私有的BitBucket上。

使用git clone命令将版本库克隆到本地：
```
git clone https://repo.git
```

5. 安装依赖
进入到工程目录，执行：
```
npm install
```
npm会将依赖的模块自动下载并安装到`./node_modules`目录下。

如果在内网环境中，无法直连，可以加入`--proxy`参数，使用代理服务器进行连接， 例如： `--proxy socks://IP:PORT`


6. 运行开发服务器
安装好依赖之后，在工程目录下执行：
```
npm run dev
```
会在3000端口上启动一个开发用的HTTP服务器。

接下来访问 [http://127.0.0.1:3000](http://127.0.0.1:3000) ，就可以看到应用首页了。

7. 修改代码
修改任意一个文件，如`src/pages/debugmenu.js` ，修改完成后保存，会在浏览器上立即看到结果。

8. 代码构建
开发完成后，如果需要在本机构建工程，则需要执行：
```
npm run build
```
编译好的文件会生成在`dist`目录中



## 应用概述
- 本SDK为SPA单页应用
- 对外只提供一组js与.css文件
- 轻量级，不依赖任何第三方MVVM框架，或Bootstrap等样式库
- 因兼容性考虑，依赖外部的jQuery2.X
- 模块化开发，Webpack打包
- ES6语法，Babel转译
- 独立的.tpl模板
- 使用Eslint约束编码规范



## 目录及用途
- src/index.html - 基础HTML页面结构，不需要改动
- src/index.js - 程序入口
- src/routes.js - 路由
- src/util.js - 工具封装
- src/state.js - 全局变量，用于页面间共享状态
- src/images/* - 图标，最终会被BASE64打包进CSS
- src/style/* - 样式，使用LESS编写
- src/pages/* - 页面，每个页面均分为.js（脚本）与.tpl（页面模板）两个文件
- src/template/* - 页面DOM模板，临时测试使用，测试完成后手工将内容移至.tpl文件中，本目录不会被打包

## 开发进阶
### 模块热替换
模块热替换(HMR)是webpack提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。
它通过WebSocket等技术实现，当修改完一段代码后，直接保存，就可以立即在浏览器上查看到结果，大幅提升开发效率。


### 基础工具封装
util.js 中封装了一些基础功能，请直接使用，不要再进行重复开发。


### Eslint代码检测
ESLint 是一个开源的 JavaScript 代码检查工具。
代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。
对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。
JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。ESLint可以让程序员在编码的过程中发现问题而不是在执行的过程中。
Eslint的规则已经配置好，在WebStorm这样的IDE中可以自动识别，直接使用即可。


### 共享状态
页面间传值，共享状态时，请在`src/state.js`中定义



### 页面路由
为了简化操作，路由信息无须配置。
引入`src/router.js`，直接调用router.go()即可。


### LESS样式
使用LESS进行样式的开发，WebPack打包后会转译为CSS
公共的样式文件位于 `src/styles` 目录，入口是 `index.less`
在`mixins.less`中，定义了基础的颜色、相对路径等信息，其它的.less中可以直接引用它


## 知识储备
### JavaScript
https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000

### ES2015
https://babeljs.io/learn-es2015/
http://yanhaijing.com/javascript/2015/09/11/learn-es2015/

### NPM
https://www.npmjs.com/
http://javascript.ruanyifeng.com/nodejs/npm.html
http://www.runoob.com/nodejs/nodejs-npm.html
http://www.jianshu.com/p/e958a74a0fd7

### Webpack
https://webpack.js.org/
https://segmentfault.com/a/1190000006178770
https://llp0574.github.io/2016/11/29/getting-started-with-webpack2/
https://github.com/vuejs-templates/webpack

### eslint
https://cn.eslint.org/
