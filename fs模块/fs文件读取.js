// 1. 引入 fs 模块
const fs = require('fs')
const process = require('process')

// 2.异步读取  err 接收错误信息  data接收文件内容
// fs.readFile('./观书有感.txt',(err,data) => {
//     if(err){
//         console.log('读取失败');
//         return
//     }
//     // .toString()  转换成字符串形式正常输出
//     console.log(data.toString());
// })

// 3.同步读取
// let data = fs.readFileSync('./观书有感.txt')
// console.log(data.toString());

// 流式读取  每次取出 64k 数据后执行一次 回调输出一个块  如果数据大会返回多个块
// 处理大文件提高读取文件效率
// 创建流读取对象
const rs1 = fs.createReadStream('./观书有感.txt');
// 3.绑定 data 事件  chunk 块
rs1.on('data',chunk => {
    console.log(chunk);
    // 其中一个满块 chunk.length 会返回 65536   也就是 64kb
    // 而且不能 chunk.toString() 会返回乱码
})
// 4.end 可选事件  返回回调函数
rs1.on('end',() => {
    console.log('读取完成');
})



// 需求：复制文件夹下的文件
// 方式一：readFile
// // 读取文件
// let data = fs.readFileSync('./观书有感.txt')
// // 写入文件
// fs.writeFileSync('./观书有感1.txt',data)

// 方式二：流式操作
// 创建读取流对象
const rs = fs.createReadStream('./观书有感.txt')
// 创建一个写入流对象
const ws = fs.createWriteStream('./观书有感1.txt')

// 绑定 data 事件
rs.on('data',chunk => {
    ws.write(chunk)
})

rs.on('end',() => {
    // process 需要导入，process.memoryUsage() 内存占用量
    console.log(process.memoryUsage());
})

// rs.pipe(ws)   // 也可以实现快速复制





