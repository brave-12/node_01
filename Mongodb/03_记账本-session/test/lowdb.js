// 导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
// 获取 db 对象
const db = low(adapter)

// 获取单条数据
// let res = db.get('posts').find({id:1}).value()
// console.log(res);


// 初始化数据  空数据   空对象   write() 表示写入文件数据
db.defaults({ posts: [], user: {} }).write()

// 写入数据
// db.get('posts').push({ id: 3, title: '今天天气不错~~'}).write()
// db.get('posts').unshift()   在数组前面插入数组

// 获取数据
console.log(db.get('posts').value());

// 删除数据
// let res = db.get('posts').remove({id:3}).write()
// console.log(res);

// 更新数据   write() 只要有更新或者改动就调用这个方法
let res = db.get('posts').find({id:1}).assign({title:'今天下雨了!!'}).write()







