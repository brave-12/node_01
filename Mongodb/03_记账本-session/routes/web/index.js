const express = require('express');
// 创建路由对象
const router = express.Router();
// 导入 moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModel');
// 测试 moment
// console.log(moment('2023-7-6').toDate());
// 格式化日期对象
// console.log(moment(new Date()).format('YYYY-MM-DD'));
// 导入中间件检测登陆
let checkLoginMiddleware = require('../../middlewares/checkLoginmiddleware')


// 添加首页路由规则
router.get('/',(req,res) => {
  // 重定向  /account
  res.redirect('/account')
})

// 记账本列表
// 中间键放在 checkLoginmiddleware 文件夹
// 为每个 router 添加 checkLoginMiddleware 中间件   判断是否登陆  如果没有登陆则跳回登录页
router.get('/account', checkLoginMiddleware,function(req, res, next) {

  // 获取所有的账单信息
  // let accounts = db.get('accounts').value()
  // console.log(accounts);

  // 读取集合信息
  AccountModel.find().sort({time:-1}).exec((err,data) => {
    if(err){
      res.status(500).send('读取失败~~')
      return
    }
    // 返回数据
    // console.log(data);

    // 响应成功的提示
    // 把模板文件 list.ejs 响应给浏览器
    res.render('list', {accounts: data,moment: moment})
  })

});

// 添加记录
router.get('/account/create', checkLoginMiddleware,function(req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account',checkLoginMiddleware,(req,res) => {
  // 查看表单数据  将 2023-07-06 => new Data() 日期对象  通过 momoent
  // console.log(req.body);
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改 time 属性的值  用重新定义的 time 覆盖原本的 time
    time: moment(req.body.time).toDate()
  },(err,data) => {
    if(err){
      req.status(500).send('插入失败~~')
    }
  })
  // 成功提醒  然后可以点击 点击跳转 进行跳转页面
  res.render('success', {msg: '添加成功~~',url: '/account'})

})


// 删除记录  也就是跳转 /account/:id 网页后删除对应数据  可以通过点击删除按钮后条状到对应网页
router.get('/account/:id',checkLoginMiddleware,(req,res) => {
  // 获取 params 的 id 参数
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({_id:id},(err,data) => {
    if(err){
      res.status(500).send('删除失败~~')
      return
    }
    // 提醒
    res.render('success', {msg: '删除成功~~',url: '/account'})
  })
})


module.exports = router;
