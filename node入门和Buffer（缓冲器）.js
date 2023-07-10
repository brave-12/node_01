const { buffer } = require("stream/consumers");

console.log('hello Node.js');
// Node.js 不能使用 BOM  和 DOM 的 API
// console.log(window);
// console.log(history);

// log 和 setTimeout 定时器还可以使用
setTimeout(() => {
    console.log('love');
}, 1000);

// Node.js 顶级对象是 global  不是  window
// console.log(global);
//console.log(globalThis);  // ES2020 新增
console.log(globalThis === global);  // ES2020

// Buffer 是一个类似于数组(Array)的 对象 ，用于表示固定长度的字节序列
// Buffer 本质是一段内存空间，专门用来处理 二进制数据 。
// 特点  1. Buffer 大小固定且无法调整
// 2. Buffer 性能较好，可以直接对计算机内存进行操作
// 3. 每个元素的大小为 1 字节（byte）等于 8 位

// Buffer.alloc()   在创建 buffer 时对于原有数据清零
let buf = Buffer.alloc(10) 
console.log(buf);
// Buffer.allocUnsafe()      在创建 buffer 时候不会对于原有共用数据清零  可能留有旧数据
let buf_2 = Buffer.allocUnsafe(100)
console.log(buf_2);
//  Buffer.from  将一个字符串或者一个数组转换为  Buffer
let buf_3 = Buffer.from('hello')
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf_3);  // 转换时候将每个字符转换为 unicode码表(给予ASCII) 的数字  然后转换十六进制
console.log(buf_4);  // 返回  <Buffer 69 6c 6f 76 65 79 6f 75>
console.log(buf_4.toString());  // 转换成字符串 iloveyou
// toString 默认是按照 utf-8 编码方式进行转换的。

// Buffer 可以直接通过 [] 的方式对数据进行处理。
console.log(buf_3[0].toString(2));  // 返回 h 对应的码值 101
// 加上 toString(2) 转换成 2 进制 1101000  第一位隐藏了一个 0  其实是 01101000
console.log(buf);
buf[0] = 95  // 改变 buf 第一位为 95 十六进制转换之后为 5f
console.log(buf);

// 1. 溢出：如果修改的数值超过 255 ，因为8位二进制最大表示为255
// 则超过 8 位数据会被舍弃(只取前八位)  比如 361 转换为二进制为 0001 0110 1001  只写入 0110 1001
// 2. 一个 utf-8 的字符(也就是中文) 一般 占 3 个字节
let buf_5 = Buffer.from('你好')
console.log(buf_5);


