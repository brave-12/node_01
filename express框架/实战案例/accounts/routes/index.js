var express = require('express');
var router = express.Router();
// 导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json')
// 导入 shortid
const shortid = require('shortid')
// 获取 db 对象
const db = low(adapter)

/* GET home page. */
// 记账本列表
router.get('/account', function(req, res, next) {
  // 获取所有的账单信息
  let accounts = db.get('accounts').value()
  // console.log(accounts);
  
  // 把模板文件 list.ejs 响应给浏览器
  res.render('list', {accounts: accounts})
});

// 添加记录
router.get('/account/create', function(req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account',(req,res) => {
  // 获取请求体数据
  // console.log(req.body);
  // 生成id
  let id = shortid.generate()
  // 写入文件  push 改成 unshift 从数组前面添加   便于查看数据
  db.get('accounts').unshift({id:id, ...req.body}).write()
  // 成功提醒  然后可以点击 点击跳转 进行跳转页面
  res.render('success', {msg: '添加成功~~',url: '/account'})

})


// 删除记录  也就是跳转 /account/:id 网页后删除对应数据  可以通过点击删除按钮后条状到对应网页
router.get('/account/:id',(req,res) => {
  // 获取 params 的 id 参数
  let id = req.params.id
  // 删除
  db.get('accounts').remove({id:id}).write()
  // 提醒
  res.render('success', {msg: '删除成功~~',url: '/account'})
})


module.exports = router;
