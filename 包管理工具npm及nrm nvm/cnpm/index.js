// 1.导入 uniq 包    uniq 函数 删除数据中的重复项   然后会按顺序排序
const uniq = require('uniq')

// 2.使用函数
let arr = [1,2,3,4,5,4,2,3]
const result = uniq(arr)
console.log(result);

// require 导入 npm 包基本流程
// 1. 在当前文件夹下 node_modules 中寻找同名的文件夹
// 2. 在上级目录中下的 node_modules 中寻找同名的文件夹，直至找到磁盘根目录


// 开发环境是程序员 专门用来写代码 的环境，一般是指程序员的电脑，开发环境的项目一般 只能程序员自己访问
// 生产环境是项目 代码正式运行 的环境，一般是指正式的服务器电脑，生产环境的项目一般 每个客户都可以访问
// 所以 开发依赖 是只在开发阶段使用的依赖包，而 生产依赖 是开发阶段和最终上线运行阶段都用到的依赖包


// 我们可以执行安装选项 -g 进行全局安装
// npm i -g nodemon
// 全局安装完成之后就可以在命令行的任何位置运行 nodemon 命令
// 该命令的作用是 自动重启 node 应用程序

// 全局安装的命令不受工作目录位置影响
// 可以通过 npm root -g 可以查看全局安装包的位置
// 不是所有的包都适合全局安装 ， 只有全局类的工具才适合，可以通过 查看包的官方文档来确定
// 安装方式 ，这里先不必太纠结

// windows 默认不允许 npm 全局命令执行脚本文件，所以需要修改执行策略

// 在项目协作中有一个常用的命令就是 npm i ，通过该命令可以依据 package.json 和 package-lock.json 的依赖声明安装项目依赖
// 因为 node_modules 文件夹大多数情况都不会存入版本库     所以通过这个可以快速安装包


// 项目中可能会遇到版本不匹配的情况，有时就需要安装指定版本的包，可以使用下面的命令的
// ## 格式
// npm i <包名@版本号>
// ## 示例
// npm i jquery@1.11.2

// 项目中可能需要删除某些不需要的包，可以使用下面的命令
// ## 局部删除
// npm remove uniq
// npm r uniq
// ## 全局删除
// npm remove -g nodemon



