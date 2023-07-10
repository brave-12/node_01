// express 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架，官方网址：https://www.expressjs.com.cn/
// 简单来说，express 是一个封装好的工具包，封装了很多功能，便于我们开发 WEB 应用（HTTP 服务）

// express 本身是一个 npm 包，所以可以通过 npm 安装
// npm init
// npm i express

// 导入 express
const express = require('express')
const fs = require('fs')
const { url } = require('inspector')
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')

// 创建应用对象
const app = express()

// 创建路由
app.get('/home',(req,res) => {
    res.end('hello express')
})
app.get('/',(req,res) => {  // 相当于访问  http://127.0.0.1:3000/   也就是输入网址跳到的网页
    res.end('home')
})
// post 不能直接通过地址栏回车  可以通过另外一个表单的网页跳转获得
app.post('/login1',(req,res) => {
    res.end('login login')
})
// test 匹配所有的请求方法
app.all('/test',(req,res) => {
    res.end('test test')
})

// 获取路由参数  直接根据 id 匹配跳转  不用单独对于每个网页进行设置
// app.get('/:id.html',(req,res) => {
//     // 获取 URL 路由参数      params 存储所有路由参数
//     console.log(req.params.id);
//     // 中文乱码设置
//     res.setHeader('content-type','text/html;charset=utf-8')
//     res.end('路由参数')
// })


//获取请求的路由规则
app.get('/request', (req, res) => {
    //1. 获取报文的方式与原生 HTTP 获取方式是兼容的
    // 请求方法，url，协议版本，请求头
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);
    
    //2. express 独有的获取报文的方式
    //获取查询字符串
    console.log(req.query); // 『相对重要』   地址栏输入后返回地址栏内容
    // 获取 ip
    // console.log(req.ip);

    // 获取指定的请求头
    console.log(req.get('host'));
    res.send('请求报文的获取');
});


// express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生 HTTP 模块的获取方式
//获取请求的路由规则
app.get("/response", (req, res) => {
    // 中文乱码设置
    // res.setHeader('content-type','text/html;charset=utf-8')
    //1. express 中设置响应的方式兼容 HTTP 模块的方式
    // res.statusCode = 404;
    // res.statusMessage = 'love';
    // res.setHeader('abc','xyz');
    // res.write('响应体');
    // res.end('xxx');

    //2. express 的响应方法   send 会自动一个中文的字符集设置
    res.status(500); //设置响应状态码
    res.set('xxx','yyy');//设置响应头
    res.send('中文响应不乱码');//设置响应体
    
    // 可以连贯设置
    // res.status(500).set('xxx','yyy').send('中文响应不乱码');

    //3. 其他响应
    // res.redirect('http://atguigu.com')//重定向   响应跳转到新的网页
    // res.download('./package.json');//下载响应  会下载文件
    // res.json({name:'尚硅谷'，slogon:'让天下没有难学的技术'}); //响应 JSON  可以反映这个数组到网页中
    // res.sendFile(__dirname + '/home.html') //响应文件内容到网页
});



// 声明全局中间件函数  
function recordMiddleware(req, res, next){
    // 获取 url 和 ip
    let {url,ip} = req;
    // 将信息保存在文件中  access.log      /home  127.0.0.1
    fs.appendFileSync(path.resolve(__dirname,'./access.log'),`${url} ${ip}\r\n`)
    // 调用 next    会继续调用后续的回调函数
    next()
}

// 使用中间件函数   调用返回每个响应的网页数据
app.use(recordMiddleware)
// express 允许使用 app.use() 定义多个全局中间件
// app.use(function (request, response, next) {
//     console.log('定义第一个中间件');
//     next();
// })
//     app.use(function (request, response, next) {
//     console.log('定义第二个中间件');
//     next();
// })
app.get('/qwe',(req,res) => {
    // 中文乱码设置
    res.setHeader('content-type','text/html;charset=utf-8')
    res.end('路由参数')
})



// 如果 只需要对某一些路由进行功能封装 ，则就需要路由中间件
// 声明路由中间件    这个 ){  中间的  => 可以省略
function checkCodeMiddleware(req, res, next){
    // req.query 用来获取get方法传递的参数
    // 判断 URL 中是否 code 参数等于 521
    if(req.query.code === '521'){
        // 如果满足条件则调后面的路由回调
        next()
    } else {
        res.send('暗号错误')
    }
}

// 先执行 checkCodeMiddleware 函数判断条件  然后进行后续流程是否执行
app.get('/setting',checkCodeMiddleware,(req,res) => {
    res.send('setting')

})
app.get('/setting1',checkCodeMiddleware,(req,res) => {
    res.send('setting1')
})
app.get('/setting2',checkCodeMiddleware,(req,res) => {
    res.send('setting2')
})



// express 内置处理 静态资源的中间件 
// 浏览器把请求发送过来之后  服务端寻找该文件夹下的对应文件  读取文件响应内容
app.use(express.static(__dirname + '/public'))   //当然这个目录中都是一些静态资源
//如果访问的内容经常变化，还是需要设置路由
//但是，在这里有一个问题，如果public目录下有index.html文件，单独也有index.html的路由，
//则谁书写在前，优先执行谁

// 1. index.html 文件为默认打开的资源    也就是只输入 http://127.0.0.1:3000/ 的时候会跳转到 index.html
// 2. 如果静态资源与路由规则同时匹配，谁先匹配谁就响应
// 3. 路由一般响应动态资源，静态资源中间件一般响应静态资源



//处理 querystring 格式的请求体
let urlParser = bodyParser.urlencoded({extended:false});
//处理 JSON 格式的请求体
let jsonParser = bodyParser.json();

// 获取请求体数据
app.get('/login',(req,res) => {
    // 响应 HTML 文件内容
    res.sendFile(__dirname + '/form.html')
})

app.post('/login',urlParser,(req,res) => {
    // 获取从刚刚表单输入的用户名和密码
    console.log(req.body);
    res.send('获取用户数据')
})



// 防盗链实践   也就是如果不是该网页的请求  比如别的网页进行请求地址会失效
// 声明中间件
// app.use((req,res,next) => {
//     // 检测请求头中的 referer 是否为 127.0.0.1.
//     let referer = req.get('referer')
//     if(refer){
//         // 实例化
//         let url = new URL(referer )
//         // 获取 hostname
//         let hostname = url.hostname
//         // 访问只能是 127.0.0.1    即使是 localhost 和访问该网址同理也不行
//         // 判断
//         if(hostname !== '127.0.0.1'){
//             // 响应 404
//             res.status(404).send('<h1>404 Not Found</h1>')
//             return
//         }
//     }
//     next()
// })



// express 中的 Router 是一个完整的中间件和路由系统，可以看做是一个小型的 app 对象。
// Router 作用    对路由进行模块化，更好的管理路由
// Router 使用  创建独立的 JS 文件（homeRouter.js） 写在另外一个文件夹 routes 下
// 在 router 对象身上添加路由
// // 1. 导入 express
// const express = require('express');
// // 2. 创建路由器对象
// const router = express.Router();
// // 3. 在 router 对象身上添加路由
// router.get('/', (req, res) => {
// res.send('首页');
// })
// router.get('/cart', (req, res) => {
// res.send('购物车');
// });
// //4. 暴露
// module.exports = router;

// 主文件
// // 5.引入子路由文件
// const homeRouter = require('./routes/homeRouter');
// // 6.设置和使用中间件
// app.use(homeRouter);


// 1.设置模板引擎
app.set('view engine','ejs')  // pug  twing   都是模板引擎
// 2.设置模板文件的存放位置  模板文件：具有模板语法内容的文件
// path.resolve   path.resolve 将路径或路径片段的序列解析为绝对路径
app.set('views',path.resolve(__dirname,'./views'))
// 3.创建路由  
app.get('/view',(req,res) => {
    // 通过 render 响应
    // res.render('模板文件名','数据')
    // 这个title 数据可以在 home 里面使用
    let title = 'hello 测试'
    // home 表示 view 文件夹下的 home.ejs 文件
    res.render('home',{title})
    // 4.创建模板文件



})



// * 可以匹配所有地址  可以用于 404 响应
app.all('*',(req,res) => {
    res.send('<h1>404 Not Found</h1>')
})


// 监听端口 启动服务
app.listen(3000, () =>{
    console.log('服务已经启动, 端口监听为 3000...');
});

// 命令行下执行该脚本
// node <文件名>
// # 或者
// nodemon <文件名>     在线编辑改动后悔保存运行


// express 路由： 路由确定了应用程序如何响应客户端对特定端点的请求
// 一个路由的组成有 请求方法 ， 路径 和 回调函数 组成
// express 中提供了一系列方法，可以很方便的使用路由，使用格式如下：
// app.<method>(path，callback)     (路径,回调函数)


// 中间件（Middleware）本质是一个回调函数
// 中间件函数 可以像路由回调一样访问 请求对象（request） ， 响应对象（response）
// 中间件的作用 就是 使用函数封装公共操作，简化代码
// 中间件的类型
// 全局中间件
// 路由中间件
// 每一个请求 到达服务端之后 都会执行全局中间件函数


// 获取请求体数据 body-parser
// express 可以使用 body-parser 包处理请求体

// 第一步：安装
// npm i body-parser
// 第二步：导入 body-parser 包
// const bodyParser = require('body-parser');
// 第三步：获取中间件函数
// //处理 querystring 格式的请求体
// let urlParser = bodyParser.urlencoded({extended:false}));
// //处理 JSON 格式的请求体
// let jsonParser = bodyParser.json()
// 第四步：设置路由中间件，然后使用 request.body 来获取请求体数据
// app.post('/login', urlParser, (request,response)=>{
//     //获取请求体数据
//     //console.log(request.body);
//     //用户名
//     console.log(request.body.username);
//     //密码
//     console.log(request.body.userpass);
//     response.send('获取请求体数据');
// });
// 获取到的请求体数据：
// [Object: null prototype] { username: 'admin', userpass: '123456' }















