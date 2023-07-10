// MongoDB 是一个基于分布式文件存储的数据库，官方地址 https://www.mongodb.com/
// 数据库（DataBase）是按照数据结构来组织、存储和管理数据的 应用程序
// 数据库的主要作用就是 管理数据 ，对数据进行 增（c）、删（d）、改（u）、查（r）

// 相比于纯文件管理数据，数据库管理数据有如下特点：
// 1. 速度更快
// 2. 扩展性更强
// 3. 安全性更强
// 操作语法与 JavaScript 类似，容易上手，学习成本低

// Mongodb 中有三个重要概念需要掌握
// 数据库（database） 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存
// 放很多集合
// 集合（collection） 集合类似于 JS 中的数组，在集合中可以存放很多文档
// 文档（document） 文档是数据库中的最小单位，类似于 JS 中的对象

// 一个 JSON 文件 好比是一个 数据库 ，一个 Mongodb 服务下可以有 N 个数据库
// JSON 文件中的 一级属性的数组值 好比是 集合
// 数组中的对象好比是 文档
// 对象中的属性有时也称之为 字段

// 一般情况下   一个项目使用一个数据库
// 一个集合会存储同一种类型的数据

// 1> 将压缩包移动到 C:\Program Files 下，然后解压
// 2> 创建 C:\data\db 目录，mongodb 会将数据默认保存在这个文件夹
// 3> 以 mongodb 中 bin 目录作为工作目录，启动命令行
// 4> 运行命令 mongod
// 看到 waiting for connections 则表明服务 已经启动成功
// 然后可以使用 mongo 命令连接本机的 mongodb 服务

// 为了方便后续方便使用 mongod 命令，可以将 bin 目录配置到环境变量 Path 中
// 千万不要选中服务端窗口的内容 ，选中会停止服务，可以 敲回车 取消选中


// 数据库命令
// 1. 显示所有的数据库
// show dbs
// 2. 切换到指定的数据库，如果数据库不存在会自动创建数据库
// use 数据库名
// 3. 显示当前所在的数据库
// db
// 4. 删除当前数据库
// use 库名
// db.dropDatabase()

// 集合命令
// 1. 创建集合
// db.createCollection('集合名称')
// 2. 显示当前数据库中的所有集合
// show collections
// 3. 删除某个集合
// db.集合名.drop()
// 4. 重命名集合
// db.集合名.renameCollection('newName')

// Mongoose 是一个对象文档模型库，官网 http://www.mongoosejs.net/
// 方便使用代码操作 mongodb 数据库


// 1.安装 mongoose
// 2.导入 mongoose
const mongoose = require('mongoose')

// 要是连接成功上面有个提醒 设置 strictQuery 为 true
mongoose.set('strictQuery',true)

// 连接 mongodb 服务   mongodb 是协议名称    默认端口 27017 可写可不写    bilibili  数据库名称，如果不存在会自动创建
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 4.设置回调
// 设置连接成功的回调   once 一次    事件回调函数只执行一次    on 的话重新连接数据库后再连接一下http服务
mongoose.connection.once('open',() => {
    // console.log('连接成功');
    // 5.创建文档结构对象
    // 设置集合中文档的属性以及属性值的类型
    let BookSchema = new mongoose.Schema({
        name:  {
            type: String,
            required: true // 设置必填项  表明该属性必须不为空
        },
        author:{
            type: String,
            default: '匿名' // 默认值   如果没有值传则传输该值
            // enum: ['男','女']   // 枚举值  设置的值必须是数组中的
            // unique: true   // 唯一值  也就是唯一索引  unique 需要 重建集合 才能有效果   永远不要相信用户的输入
        },
        price: Number,
        is_hot: Boolean,
        pub_time: Date
    });

    // 6.创建模型对象  对文档操作的封装对象   'oks'   代表使用的数据库
    let BookModel = mongoose.model('novel', BookSchema);   // 不能运行的话改回 books

    // 删除一条数据   放在另外一个文件里面运行  不然跟下面创建冲突  或者创建后将下面删除
    // BookModel.deleteOne({_id:'64a3c3e837f3de0b7f3002d2'},(err,data) => {
    //   // 判断
    //   if(err){
    //     console.log('删除失败');
    //     return
    //   }
    //   // 输出 data
    //   console.log(data);
    // })

    // 批量删除数据  把 is_hot 为 false(也就是不热门) 的书全部删除掉  
    // BookModel.deletemany({is_hot:false},(err,data) => {
    //   // 判断
    //   if(err){
    //     console.log('删除失败');
    //     return
    //   }
    //   // 输出 data
    //   console.log(data);
    // })


    // 更新文档 一条  更新 红楼梦 的价格为 9.9
    // BookModel.updateOne({name:'红楼梦'},{price:9.9},(err,data) => {
    //     // 判断
    //     if(err){
    //         console.log('更新失败~~');
    //         return
    //     }
    //     // 输出 data
    //     console.log(data);
    // })

    // 批量更新  把所有作者为 余华 的书改为 不热门
    // BookModel.updateMany({author:'余华'},{is_hot:false},(err,data) => {
    //     // 判断
    //     if(err){
    //         console.log('更新失败~~');
    //         return
    //     }
    //     // 输出 data
    //     console.log(data);
    // })

    // 读取单条信息
    // BookModel.findOne({name:'狂飙'},(err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    // })

    // 根据 ID 获取文档
    // BookModel.findById('64a3c3e837f3de0b7f3002ce',(err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    // })

    // 批量获取
    // BookModel.find({author:'余华'},(err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    // })

    // 读取所有书本  也就是不加条件
    // BookModel.find((err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    // })


    // 在 mongodb 不能 > < >= <= !== 等运算符，需要使用替代符号
    // > 使用 $gt
    // < 使用 $lt
    // >= 使用 $gte
    // <= 使用 $lte
    // !== 使用 $ne
    // db.students.find({id:{$gt:3}})  // id号比3大的所有的记录

    // 查询价格小于 20 的图书    $lt  小于的意思 
    // BookModel.find({price:{$lt:20}},(err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    // })

    // $or 逻辑或的情况    $and 逻辑与的情况
    // 查询 曹雪芹 或者 余华 的书
    // BookModel.find({$or: [{author:'曹雪芹'},{author:'余华'}]},(err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    //     // 8.运行后关闭数据库连接(项目运行过程中，不会添加该代码,否则会重复运行数据库连接)
    //     mongoose.disconnect()
    // })

    // 查询价格大于 30 且小于 70 的书
    // BookModel.find({$and: [{price:{$gt: 30}},{price: {$lt:70}}]},(err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    //     // 8.运行后关闭数据库连接(项目运行过程中，不会添加该代码,否则会重复运行数据库连接)
    //     mongoose.disconnect()
    // })


    // 正则匹配  条件中可以直接使用 JS 的正则语法，通过正则可以进行模糊查询
    // 搜索书籍名称中带有 `三` 的图书
    // BookModel.find({name: new RegExp('三')},(err,data) => {   // 另外一种写法  如果是变量需要这种方式
    // BookModel.find({name: /三/},(err,data) => {
    //     if(err){
    //         console.log('读取失败');
    //         return
    //     }
    //     // 输出 data 变量的值
    //     console.log(data);
    //     // 8.运行后关闭数据库连接(项目运行过程中，不会添加该代码,否则会重复运行数据库连接)
    //     mongoose.disconnect()
    // })


    // 个性化读取
    // 字段筛选  这样就只会返回 name 和 author 字段   如果不要返回 id 则设置 _id: 0
    // BookModel.find().select({name: 1,author: 1}).exec(function(err,data){
    //     if(err) {
    //         console.log('查询失败~~');
    //         return
    //     }
    //     console.log(data);
    //     mongoose.connection.close();
    // })

    // 数据排序  sort 排序  1:升序 -1:倒序  按 price 升序排列 并且只发明会 name 和 price
    // BookModel.find().select({name: 1,price: 1}).sort({price:1}).exec(function(err,data){
    //     if(err) {
    //         console.log('查询失败~~');
    //         return
    //     }
    //     console.log(data);
    //     mongoose.connection.close();
    // })

    // 数据截取  skip 跳过 limit 限定   跳过前三条  取后面三条 并且只去 name 和 price  不取id  按 price 升序排列
    BookModel.find().select({name: 1,price: 1,_id: 0}).sort({price:1}).skip(3).limit(3).exec(function(err,data){
        if(err) {
            console.log('查询失败~~');
            return
        }
        console.log(data);
        mongoose.connection.close();
    })

    // Robo 3T 免费 https://github.com/Studio3T/robomongo/releases
    // Navicat 收费 https://www.navicat.com.cn/



    // 7.新增书本
    // BookModel.create({
    //     name: '西游记',
    //     author: '吴承恩',
    //     price: 19.9,
    //     is_hot: true,
    //     pub_time: new Date()
    //   }, (err, data) => {
    //     // 判断是否有错误
    //     if(err) {
    //         console.log(err);
    //         return
    //     }
    //     // 如果没有出错 则输出插入后的文档对象
    //     console.log(data);
    //     // 8.运行后关闭数据库连接(项目运行过程中，不会添加该代码,否则会重复运行数据库连接)
    //     mongoose.disconnect()
    // })

}) 
// 设置连接错误的回调   测试的时候改一下端口就错误了
mongoose.connection.once('error',() => {
    console.log('连接失败');
})
// 设置连接关闭的回调   测试的时候关闭 mongodb 的连接
mongoose.connection.once('close',() => {
    console.log('连接关闭');
})

// 设置定时器关闭
// setTimeout(() => {
//     mongoose.disconnect()
// }, m2000);

// String   字符串
// Number   数字
// Boolean   布尔值
// Array   数组，也可以使用 [] 来标识
// Date   日期
// Buffer   Buffer 对象
// Mixed   任意类型，需要使用 mongoose.Schema.Types.Mixed 指定
// ObjectId   对象 ID，需要使用 mongoose.Schema.Types.ObjectId 指定
// Decimal128   高精度数字，需要使用 mongoose.Schema.Types.Decimal128 指定