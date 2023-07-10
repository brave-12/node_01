// 『包』英文单词是 package ，代表了一组特定功能的源码集合
// npm 全称 Node Package Manager ，翻译为中文意思是『Node 的包管理工具』
// npm 是 node.js 官方内置的包管理工具，是 必须要掌握住的工具

// npm init 命令的作用是将文件夹初始化为一个『包』， 交互式创建 package.json 文件
// package.json 是包的配置文件，每个包都必须要有 package.json

// {
//     "name": "1-npm", #包的名字
//     "version": "1.0.0", #包的版本
//     "description": "", #包的描述
//     "main": "index.js", #包的入口文件
//     "scripts": { #脚本配置
//     "test": "echo \"Error: no test specified\" && exit 1"
//     },
//     "author": "", #作者
//     "license": "ISC" #开源证书
//     }

// 初始化的过程中还有一些注意事项：
// 1. package name ( 包名 ) 不能使用中文、大写，默认值是 文件夹的名称 ，所以文件夹名称也不
// 能使用中文和大写
// 2. version ( 版本号 )要求 x.x.x 的形式定义， x 必须是数字，默认值是 1.0.0
// 3. ISC 证书与 MIT 证书功能上是相同的，关于开源证书扩展阅读http://www.ruanyifeng.com/bl
// og/2011/05/how_to_choose_free_software_licenses.html
// 4. package.json 可以手动创建与修改
// 5. 使用 npm init -y 或者 npm init --yes 极速创建 package.json


// 搜索包的方式有两种
// 1. 命令行 『npm s/search 关键字』
// 2. 网站搜索 网址是 https://www.npmjs.com/


// require 导入 npm 包基本流程
// 1. 在当前文件夹下 node_modules 中寻找同名的文件夹
// 2. 在上级目录中下的 node_modules 中寻找同名的文件夹，直至找到磁盘根目录


// 通过配置命令别名可以更简单的执行命令
// 配置 package.json 中的 scripts 属性
// 例如：
// "scripts": {
//     "server": "node server.js",
//     "start": "node index.js",
//     },
// 配置 server 和 start
// 配置完成之后，可以使用别名执行命令
// 例如 npm run server
// npm run start

// 补充说明：
// npm start 是项目中常用的一个命令，一般用来启动项目
// npm run 有自动向上级目录查找的特性，跟 require 函数也一样
// 对于陌生的项目，我们可以通过查看 scripts 属性来参考项目的一些操作


// cnpm 是一个淘宝构建的 npmjs.com 的完整镜像，也称为『淘宝镜像』，网址https://npmmirror.com/
// cnpm 服务部署在国内 阿里云服务器上 ， 可以提高包的下载速度
// 官方也提供了一个全局工具包 cnpm ，操作命令与 npm 大体相同


// 用 npm 也可以使用淘宝镜像，配置的方式有两种
// 直接配置  npm config set registry https://registry.npmmirror.com/
// 使用 nrm 配置 npm 的镜像地址 npm registry manager

// 1.建议使用第二种方式 进行镜像配置，因为后续修改起来会比较方便
// 2. 虽然 cnpm 可以提高速度，但是 npm 也可以通过淘宝镜像进行加速，所以 npm 的使用率还
// 是高于 cnpm


// yarn 是由 Facebook 在 2016 年推出的新的 Javascript 包管理工具，官方网址：https://yarnpkg.com/
// yarn 官方宣称的一些特点
// 速度超快：yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大
// 化资源利用率，因此安装速度更快
// 超级安全：在执行代码之前，yarn 会通过算法校验每个安装包的完整性
// 超级可靠：使用详细、简洁的锁文件格式和明确的安装算法，yarn 能够保证在不同系统上无差异的工作

// 我们可以使用 npm 安装 yarn   全局安装  -g
// npm i -g yarn
// 这里有个小问题就是 全局安装的包不可用 ，yarn 全局安装包的位置可以通过 yarn global bin 来查看

// 如果是公司要根据项目代码来选择，可以 通过锁文件判断 项目的包管理工具
// npm 的锁文件为 package-lock.json
// yarn 的锁文件为 yarn.lock
// 包管理工具 不要混着用，切记，切记，切记



// nvm 全称 Node Version Manager 顾名思义它是用来管理 node 版本的工具，方便切换不同版本的 Node.js
// nvm 的使用非常的简单，跟 npm 的使用方法类似
// 首先先下载 nvm，下载地址 https://github.com/coreybutler/nvm-windows/releases，
// 选择 nvm-setup.exe 下载即可（网络异常的小朋友可以在资料文件夹中获取）









