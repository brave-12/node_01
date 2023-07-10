//声明函数
function tiemo(){
    console.log('贴膜....');
}
function niejiao(){
    console.log('捏脚....');
}

// 模块暴露数据的方式有两种：
// 1. module.exports = value
// 2. exports.name = value

// 暴露数据  方法1
// module.exports = {
//     tiemo,
//     niejiao
// }

// module.exports = '我是个测试'    // 调用这个文件的时候返回 我是个测试

// 方法2
exports.tiemo = tiemo
exports.niejiao = niejiao

// module.exports 可以暴露 任意 数据
// exports = module.exports = {}
// 不能使用 exports = value 的形式暴露数据，模块内部 module 与 exports 的隐式关系
// exports = module.exports = {} ，require 返回的是目标模块中 module.exports 的值