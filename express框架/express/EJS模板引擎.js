// 7.1 什么是模板引擎
// 模板引擎是分离 用户界面和业务数据(也就是html和js) 的一种技术  js 指服务器端的 js
// 7.2 什么是 EJS
// EJS 是一个高效的 Javascript 的模板引擎
// 官网: https://ejs.co/
// 中文站：https://ejs.bootcss.com/

// 下载安装EJS  
// npm i ejs --save   
// npm 安装同样有向上查找路径   比如在其他文件夹下面 npm 安装   会自动安装到 node_modules

// 执行JS代码
// <% code %>
// 输出转义的数据到模板上
// <%= code %>
// 输出非转义的数据到模板上
// <%- code %>

// 代码示例
// 1.引入ejs
const ejs = require('ejs');
const fs = require('fs')
// 2.定义数据
let person = ['张三','李四','王二麻子'];
// 3.ejs解析模板返回结构    render(渲染)
// <%= %> 是ejs解析内容的标记，作用是输出当前表达式的执行结构
// 也就是逗号前面的内容  调用逗号后面 {person:person} 的值
let html = ejs.render('<%= person.join(",") %>', {person:person});
//4.输出结果
console.log(html);


// EJS 列表渲染
let xiyou = ['唐僧','孙悟空','猪八戒','沙僧'];
let result = ejs.render(`<ul>
    <% xiyou.forEach(item => { %>
    <li><%= item %></li>
    <% }) %>
</ul>`,{xiyou:xiyou})
// 可以通过这种方法导入然后进行输出  readFileSync  同步读取
// let html = fs.readFileSync('./02_西游.html').toString()
// let result = ejs.render(html,{xiyou:xiyou})
console.log(result);


// 条件渲染
// 变量
let isLogin = true
let result1 = ejs.render(`
    <% if(isLogin){ %>
    <span>欢迎回来</span>
    <% }else{ %>
    <button>登录</button>  <button>注册</button>
    <% } %>
`,{isLogin:isLogin})
// {isLogin:isLogin}  前面的变量要与括号内 if(isLogin) 里的一致   后面的变量要与外面定义的变量一致
console.log(result1);

