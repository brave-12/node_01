// HTTP（hypertext transport protocol）协议；中文叫超文本传输协议
// 是一种基于TCP/IP的应用层通信协议
// 这个协议详细规定了 浏览器 和万维网 服务器 之间互相通信的规则。
// 协议中主要规定了两个方面的内容
// 客户端：用来向服务器发送数据，可以被称之为请求报文
// 服务端：向客户端返回数据，可以被称之为响应报文
// 报文：可以简单理解为就是一堆字符串


// 1.导入 http 模块
const http = require('http')
// 导入 url 模块
const url = require('url')
const path = require('path')

// 2.创建服务对象
// request  请求     response 响应
const server = http.createServer((request,response) => {
    // 获取请求的方法
    // console.log(request.method);  // 返回请求方式 GET 和 POST
    // 获取请求的 url
    // console.log(request.url);  // 只包含 url 中的路径与查询字符串
    // 获取 http 协议的版本号
    // console.log(request.httpVersion);   // 返回 1.1
    // 获取 http 的请求头
    // console.log(request.headers);  // 返回请求头数组


    // 获取请求体  通过 form 表单提交跳转   form 表单使用了 post
    // // 1.申明一个变量
    // let body = ''
    // // 2.绑定 data 事件
    // request.on('data',chunk => {
    //     body += chunk
    // })
    // // 3.绑定 end 事件
    // request.on('end',() => {
    //     console.log(body);
    //     // 响应
    //     response.end('hello HTTP')
    // })


    // 提取 http 报文中的 URL 的路径与查询字符串
    // 解析 request.url  如果第二个参数设置为 true 则 query 返回会变成对象而不是一个字符串
    // let res = url.parse(request.url,true)
    // 返回响应对象的有关数组
    // console.log(res);  

    // 路径   res 45行设置
    // let pathname = res.pathname
    // // 返回   /search
    // console.log(pathname);

    // 查询字符串
    // let keyword = res.query.keyword
    // // 返回 h5  也就是键值  第二个响应对象没有值则返回 underfined
    // console.log(keyword); 

    // 方法2：不使用 url 模块实现上面代码功能
    // 逗号前后拼接补全成为一个完整的 url
    // let url = new URL(request.url,'http://127.0.0.1:9000')
    // // 输出路径
    // console.log(url.pathname);
    // // 输出 keyword 查询字符串
    // console.log(url.searchParams.get('keyword'));


    
    // 设置响应状态码   默认 200
    // response.statusCode = 203
    // 设置响应状态的描述
    // response.statusMessage = 'i love you'
    // 响应头自定义设置
    // response.setHeader('Server','Node.js')
    // response.setHeader('myheader','test test')
    // 设置多个同命的响应头   根据数组设置
    response.setHeader('test',['a','b'])
    // 设置响应体   write()   end()  一般 write 括号内设置响应体后  end里面不设置响应体
    // response.write('love')  //需要写在  response.end() 的上面   不然会报错


    // HTTP 请求练习  根据地址栏的 url 输出内容
    // 解构赋值 语法是一种 Javascript 表达式。可以将数组中的值或对象的属性取出，赋值给其他变量。
    // 例如  let {x} = y     y 里面的值取出来赋值给 x
    // 获取请求的方法
    let {method} = request
    // 获取请求的 url 路径
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    // 3. 响应内容中文乱码的解决办法  设置响应头
    response.setHeader('content-type','text/html;charset=utf-8')
    if(method === 'GET' && pathname === '/login'){
        // 设置响应体     response.end 只能有一个
        // 通过 if 判断方式输出一个    response.end  
        response.end('登录页面')
    } else if(method === 'GET' && pathname === '/reg'){  // register 注册
        response.end('注册页面')
    }else {
        // 防止输入的不是另外两个  然后一直在访问状态
        response.end('Not Found')
    }



})

// 3.监听端口，启动服务
server.listen(9000,() => {
    console.log('服务已经启动... 端口 9000');
})


// 命令行 ctrl + c 停止服务
// 2. 当服务启动后，更新代码 必须重启服务才能生效
// 4. 端口号被占用
// Error: listen EADDRINUSE: address already in use :::9000
// 1.关闭当前正在运行监听端口的服务 （ 使用较多 ）   2.修改其他端口号

// HTTP 协议默认端口是 80 。HTTPS 协议的默认端口是 443, HTTP 服务开发常用端口有 3000，8080，8090，9000 等
// 如果端口被其他程序占用，可以使用 资源监视器 找到占用端口的程序，然后使用 任务管理器 关闭对应的程序
// 如果直接使用默认端口 80   输入 url 的时候不用额外写端口  会自动跳到 端口80
// 例如直接写 127.0.0.1   不用写端口会默认访问到 80 端口


// 静态资源是指 内容长时间不发生改变的资源 ，例如图片，视频，CSS 文件，JS文件，HTML文件，字体文件等
// 动态资源是指 内容经常更新的资源 ，例如百度首页，网易首页，京东搜索列表页面等


// HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 静态资源目录 ，也称之为 网站根目录
// 网页中的 URL 主要分为两大类：相对路径与绝对路径

// 绝对路径可靠性强，而且相对容易理解，在项目中运用较多
// 三种形式
// http://www.atguigu.com/       /atguigu.com/web     /web

// 相对路径在发送请求时，需要与当前页面 URL 路径进行计算 ，得到完整 URL 后，再发送请求，学习阶段用的较多
// 因为当文件夹移动的时候  文件内容也会移动  所以相对路径 不够可靠
// 例如当前网页 url 为 http://www.atguigu.com/course/h5.html
// 形式：
// /css/app.css   ../img/logo.png     s/app.js 最终URL：http://www.atguigu.com/course/js/app.js


// 网页中使用 URL 的场景小结
// 包括但不限于如下场景：
// a 标签 href    link 标签 href
// script 标签 src   img 标签 src
// video audio 标签 src   form 中的 action
// AJAX 请求中的 URL


// 媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准
// 用来表示文档、件或字节流的性质和格式。
// HTTP 服务可以设置响应头 Content-Type 来表明响应体的 MIME 类型，浏览器会根据该类型决定如何处理资源

// mime 类型结构： [type]/[subType]
// 例如： text/html text/css image/jpeg image/png application/json

// 下面是常见文件对应的 mime 类型
// html: 'text/html',
// css: 'text/css',
// js: 'text/javascript',
// png: 'image/png',
// jpg: 'image/jpeg',
// gif: 'image/gif',
// mp4: 'video/mp4',
// mp3: 'audio/mpeg',
// json: 'application/json

// 对于未知的资源类型，可以选择 application/octet-stream 类型，浏览器在遇到该类型的响应
// 时，会对响应体内容进行独立存储，也就是我们常见的 下载 效果


// GET 请求的情况：
// 在地址栏直接输入 url 访问
// 点击 a 链接
// link 标签引入 css
// script 标签引入 js
// img 标签引入图片
// form 标签中的 method 为 get （不区分大小写）
// ajax 中的 get 请求

// POST 请求的情况：
// form 标签中的 method 为 post（不区分大小写）
// AJAX 的 post 请求

// GET 和 POST 是 HTTP 协议请求的两种方式。
// 1.GET 主要用来获取数据，POST 主要用来提交数据
// 2.GET 带参数请求是将参数缀到 URL 之后，在地址栏中输入 url 访问网站就是 GET 请求，
// POST 带参数请求是将参数放到请求体中
// 3.POST 请求相对 GET 安全一些，因为在浏览器中参数会暴露在地址栏
// 4.GET 请求大小有限制，一般为 2K，而 POST 请求则没有大小限





