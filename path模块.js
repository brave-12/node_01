// 导入 fs 和 path 模块
const fs = require('fs')
const path = require('path')

// path 模块提供了 操作路径 的功能，我们将介绍如下几个较为常用的几个 API：
// API 说明
// path.resolve 拼接规范的绝对路径 常用
// path.sep 获取操作系统的路径分隔符
// path.parse 解析路径并返回对象
// path.basename 获取路径的基础名称
// path.dirname 获取路径的目录名
// path.extname 获得路径的扩展名

// resolve  解决   让拼接字符串的格式正常  不会出现一个正斜杠 一个反斜杠
// index.txt 与 ./index.txt  一致   跟  /index.txt  不同  这个会转换成绝对路劲  不会拼接前面路径
console.log(path.resolve(__dirname,'index.txt'));  
// sep 分隔符   返回一个 \  斜杠
console.log(path.sep);  


