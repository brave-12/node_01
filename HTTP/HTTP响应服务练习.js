//导入 http 模块
const http = require('http');
const fs = require('fs')
const path = require('path')
// 申明一个变量
let mimes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}
//创建服务对象
const server = http.createServer((request, response) => {
    // 下面代码可以移到 table.html  通过读取文件的方法获取代码然后渲染输出
    // 读取文件内容  __dirname 变成绝对路径
    // let html = fs.readFileSync(__dirname + 'table.html')
    // response.end(html)

    // 但是 table.html 里面的 css 和 js不能用外联 link 因为服务对象 serve 的回调问题
    // css 和 js 回调的时候都只会回调 table.html 的内容  因此要根据不同的对象进行不同的响应
    // let {pathname} = new URL(request.url,'http://127.0.0.1')
    // if(pathname === '/'){
    //     let html = fs.readFileSync(__dirname + 'table.html')
    //     response.end(html)
    // }else if(pathname === '/index.css'){
    //     let css = fs.readFileSync(__dirname + 'index.css')
    //     response.end(css)
    // }else if(pathname === '/index.js'){
    //     let js = fs.readFileSync(__dirname + 'index.js')
    //     response.end(js)
    // }else{
    //     response.statusCode = 404
    //     response.end('<h1>404 Not Found</h1>')
    // }

    // 其中的 if else 有些重复步骤  可以简略  完成静态资源服务搭建
    // 获取请求 url 的路径
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    // // 拼接文件路径
    let filePath = __dirname + '/page' + pathname
    // 获取文件后缀名    slice(1) 从下标为 1 开始获取字符串
    let ext = path.extname(filePath).slice(1)
    // 获取对应类型
    // let type = mimes[ext]
    // if(type){
    //     // 匹配到了   ';charset=utf-8'  解决乱码  如果是被 html 文件使用  则编码还是看 js 的这个编码格式
    // response.setHeader('content-type',type + ';charset=utf-8')
    // }else{
    // // 对于未知的资源类型，可以选择 application/octet-stream 类型，浏览器在遇到该类型的响应
    // // 时，会对响应体内容进行独立存储，也就是我们常见的 下载 效果
    //     response.setHeader('content-type','application/octet-stream')
    // }
    console.log(ext);

    // // 读取文件 fs 异步 API
    // // 3. 响应内容中文乱码的解决办法  设置响应头
    // response.setHeader('content-type','text/html;charset=utf-8')
    // fs.readFile(filePath,(err,data) => {
    //     if(err){
    //         response.statusCode = 400
    //         response.end('文件读取失败')
    //         return
    //     }
    //     // 响应文件内容
    //     response.end(data)
    // })


    response.end(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            td {
                padding: 20px 40px;
            }
    
            /*根据 nth-child 设置子类的奇数 tr */
            table tr:nth-child(odd) {
                background: #aef;
            }
    
            /* 偶数 tr 设置 */
            table tr:nth-child(even) {
                background: #fcb;
            }
    
            table,
            td {
                border-collapse: collapse;
            }
        </style>
    </head>
    
    <body>
        <table border="1">
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <script>
            //获取所有的 td
            let tds = document.querySelectorAll('td');
            //遍历  item 点击之后变色
            tds.forEach(item => {
                item.onclick = function () {
                    this.style.background = '#222';
                }
            })
        </script>
    </body>
    
    </html>
`); //设置响应体
});
//监听端口, 启动服务
server.listen(9000, () => {
    console.log('服务已经启动....')
});
