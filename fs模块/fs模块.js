// fs 全称为 file system ，称之为 文件系统 ，是 Node.js 中的 内置模块 ，可以对计算机中的磁盘进行操作。
// 本章节会介绍如下几个操作：
// 1. 文件写入   2. 文件读取
// 3. 文件移动与重命名    4. 文件删除
// 5. 文件夹操作  6. 查看资源状态

// 需求：新建一个文件，座右铭.text， 写入内容：三人行，则必有我师焉
// 1.导入 fs 模块
const fs = require('fs')
// 2.写入文件
// writeFile 异步写入  先输出后面代码  最后输出该异步写入
// 语法： fs.writeFile(file, data[, options], callback)
// 参数说明： file 文件名         data 待写入的数据
// options 选项设置 （可选）   callback 写入回调    返回值： undefined
// 如果没有该文件则会自动创建一个
fs.writeFile('座右铭.txt','三人行，则必有我师焉，',err => {
    // err 写入失败：错误对象    写入成功：null
    if(err){
        console.log('写入失败');
        return
    }
    console.log('写入成功');
})

// writeFileSync 同步写入
// 语法: fs.writeFileSync(file, data[, options])
// 参数与 fs.writeFile 大体一致，只是没有 callback 参数
// 返回值： undefined
fs.writeFileSync('data.txt','test')

// Node.js 中的磁盘操作是由其他 线程 完成的，结果的处理有两种模式：
// 同步处理 JavaScript 主线程 会等待 其他线程的执行结果，然后再继续执行主线程的代码，效率较低
// 异步处理 JavaScript 主线程 不会等待 其他线程的执行结果，直接执行后续的主线程代码，效率较好

// appendFile / appendFileSync 追加写入
// appendFile 作用是在文件尾部追加内容，appendFile 语法与 writeFile 语法完全相同
// 语法:
// fs.appendFile(file, data[, options], callback)
// fs.appendFileSync(file, data[, options])
// 返回值： 二者都为 undefined
// Enter = 回车+换行(\r\n)  \r\n连用时,不能调换顺序
fs.appendFile('./座右铭.txt','择其善者而从之，其不善者而改之。\r\n', err => {
    if(err){
        console.log('追加失败');
        return;
    }
    console.log('追加成功')
    });

// fs.appendFileSync('./座右铭.txt','温故而知新, 可以为师矣')  
// 因为Sync是同步执行  所以当执行的时候会先执行该代码，然后执行上面的创建代码覆盖该文字
// 只是追加则没有问题
// fs.writeFile() 也能追加  但是会覆盖原有内容  达不到追加内容的效果
// 添加 {flag: 'a'} 也能实现追加内容  达到 appendFile  但是比他会先执行
fs.writeFile('./座右铭.txt','love love',{flag: 'a'},err => {
    if(err){
        console.log('追加失败');
        return;
    }
    console.log('追加成功')
    })

// createWriteStream 流式写入
// 语法： fs.createWriteStream(path[, options])
// 参数说明：
// path 文件路径    options 选项配置（ 可选 ）   返回值： Object

// 创建写入流对象
let ws = fs.createWriteStream('./观书有感.txt');
// write
ws.write('半亩方塘一鉴开\r\n');
ws.write('天光云影共徘徊\r\n');
ws.write('问渠那得清如许\r\n');
ws.write('为有源头活水来\r\n');
ws.end()
// 程序打开一个文件是需要消耗资源的 ，流式写入可以减少打开关闭文件的次数。
// 流式写入方式适用于 大文件写入或者频繁写入 的场景, writeFile 适合于 写入频率较低的场景
// 关闭通道
// ws.close()

// 当需要持久化保存数据的时候，应该想到 文件写入


// 在 Node.js 中，我们可以使用 rename 或 renameSync 来移动或重命名 文件或文件夹

// 调用 rename 方法  重命名
fs.rename('座右铭.txt','论语.txt',err => {
    if(err){
        console.log('操作失败1');
        return
    }
    console.log('操作成功1');
})

// 文件的移动   移动到的文件夹必须存在
// fs.rename('data.txt','前端/data.txt',err => {
//         if(err){
//             console.log('操作失败1');
//             return
//         }
//         console.log('操作成功1');
//     })


// 删除文件
// 调用 unlink 方法 异步   同样有 unlinkSync 同步方法
// fs.unlink('data.txt', err => {
//     if(err){
//         console.log('删除失败!');
//         return
//     }
//     console.log('删除成功!');
// })

// 调用 rm 方法删除   同样有 rmSync  同步方法
// fs.rm('data.txt',err => {
//     if(err){
//         console.log('删除失败');
//     }
//     console.log('删除成功');
// })


// 创建文件夹  mk make 制作   zdir directory  文件夹
// 在 Node.js 中，我们可以使用 mkdir 或 mkdirSync 来创建文件夹

// 创建一个 html 文件夹
// fs.mkdir('html',err => {
//     if(err){
//         console.log('创建失败2');
//         return
//     }
//     console.log('创建成功2');
// })

// recursive 表明递归创建  可以递归创建三个路径下的文件夹
// fs.mkdir('html/1/2',{recursive: true},err => {
//     if(err){
//         console.log('创建失败2');
//         return
//     }
//     console.log('创建成功2');
// })


// 读取文件夹  read 读取  dir  directory  文件夹
// 可以返回目标文件夹下面的 文件名称 的 data 列表
fs.readdir('Node截图',(err,data) => {
    if(err){
        console.log('读取失败');
        return
    }
    console.log(data);
})


// 删除文件夹  rm  remove  移除
// 但是文件下下面有子文夹的时候会删除失败  需要递归删除
// fs.rmdir('html',err => {
//     if(err){
//         console.log('删除失败');
//         return
//     }
//     console.log('删除成功');
// })


// 递归删除
// recursive 在后溪更新后可能会被移除
// fs.rmdir('html',{recursive: true},err => {
//     if(err){
//         console.log('删除失败');
//         return
//     }
//     console.log('删除成功');
// })

// 建议使用 rm 删除
fs.rm('html',{recursive: true},err => {
    if(err){
        console.log('删除失败');
        return
    }
    console.log('删除成功');
})


// 在 Node.js 中，我们可以使用 stat 或 statSync 来查看资源的详细信息
fs.stat('data.txt',(err,data) => {
    if(err){
        console.log('操作失败');
    }
    // 结果返回 stats 数组对象  宝行一系列数据
    // console.log(data);
    // data.isFile() 返回 true 表示是文件z资源    isDirectory() 返回 true 表示是文件夹
    console.log(data.isFile()); 
})


// fs 模块对资源进行操作时，路径的写法有两种：
// 相对路径
// ./座右铭.txt 当前目录下的座右铭.txt     座右铭.txt 等效于上面的写法
// ../座右铭.txt 当前目录的上一级目录中的座右铭.txt
// 绝对路径
// D:/Program Files windows 系统下的绝对路径       /usr/bin Linux 系统下的绝对路径
// 相对路径中所谓的 当前目录 ，指的是 命令行的工作目录 ，而并非是文件的所在目录
// 所以当命令行的工作目录与文件所在目录不一致时，会出现一些 BUG

// 创建文件的时候  相对路径参照物：根据命令行的工作目录   根据命令行的运行路径切换而切换  例如 cd 切换
// __dirname 与 require 类似，都是 Node.js 环境中的'全局'变量
// __dirname 保存着 当前文件所在目录的绝对路径 ，可以使用 __dirname 与文件名拼接成绝对路径

// console.log(__dirname);    // 返回当前文件目录  不受命令行路径改变而影响
// 根据当前文件目录创建 index 文件并且添加love
fs.writeFileSync(__dirname + '/index.txt','当前运行文件目录下创建该文件')  


// 读取文件夹下面的文件
const files = fs.readdirSync('Node截图')
// console.log(files);
// 遍历数组返回元素
// files.forEach(item => {
//     // console.log(item);
//     // 如果文件名需要拆分 比如从 - 拆分 然后前面的数字进行排序  可以这样写
//     let data = item.split('-')
//     let[num,name] = data
//     // 判断
//     if(Number(num) < 10){
//         num = '0' + num
//     }
//     // 创建新的文件名
//     let newName = num + '-' + name
//     console.log(newName);
//     // 重命名
//     fs.renameSync(`Node截图/${item}`,`Node截图/${newName}`)
// })




