var express = require('express');
var router = express.Router();
// 导入中间件
let checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');
// 导入 jwt
const jwt = require('jsonwebtoken')
// 导入 moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModel');


/* GET home page. */
// 记账本列表
router.get('/account',checkTokenMiddleware, function (req, res, next) {
  // 获取所有的账单信息
  // let accounts = db.get('accounts').value()
  // console.log(accounts);
    // 读取集合信息
    AccountModel.find().sort({ time: -1 }).exec((err, data) => {
      if (err) {
        res.json({
          code: '1001',
          msg: '读取失败~~',
          data: null
        })
        return
      }
      // 返回数据
      // console.log(data);

      // 响应成功的提示
      // 把模板文件 list.ejs 响应给浏览器
      res.json({
        // 响应编号  20000  0000  
        code: '0000',
        // 响应的信息
        msg: '读取成功',
        // 响应的数据
        data: data
      })

  });
})



// 新增记录
router.post('/account', checkTokenMiddleware,(req, res) => {
  // 查看表单数据  将 2023-07-06 => new Data() 日期对象  通过 momoent
  // console.log(req.body);
  // 可以进行表单验证  如果有错误则返回 1003 等提示

  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改 time 属性的值  用重新定义的 time 覆盖原本的 time
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      req.json({
        code: '1002',
        msg: '创建失败~~',
        data: null
      })
    }
    // 成功提醒  然后可以点击 点击跳转 进行跳转页面
    res.json({
      code: '0000',
      msg: '创建成功',
      data: data
    })
  })

})


// 删除记录  也就是跳转 /account/:id 网页后删除对应数据  可以通过点击删除按钮后条状到对应网页
router.delete('/account/:id', checkTokenMiddleware,(req, res) => {
  // 获取 params 的 id 参数
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({
        code: '1003',
        msg: '删除账单失败',
        data: null
      })
      return
    }
    // 提醒
    res.json({
      code: '0000',
      msg: '删除成功~~',
      data: {}
    })
  })
})


// 获取单个账单信息
router.get('/account/:id',checkTokenMiddleware, (req, res) => {
  // 获取 id 参数
  let { id } = req.params
  // 查询数据库
  AccountModel.findById(id, (err, data) => {
    if (err) {
      return res.json({
        code: '1004',
        msg: '读取失败',
        data: null
      })
    }
    // 成功响应
    res.json({
      code: '0000',
      msg: '读取成功~~',
      data: data
    })
  })
})

// 更新单个账单信息
router.patch('/account/:id',checkTokenMiddleware, (req, res) => {
  // 获取 id 参数值
  let { id } = req.params;
  // 更新数据库
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      return res.json({
        code: '1005',
        msg: '更新失败',
        data: null
      })
    }
    // 判断成功 再次查询数据库  获取单条数据   嵌套一个 获取单个账单信息   然后进行输出
    AccountModel.findById(id, (err, data) => {
      if (err) {
        return res.json({
          code: '1004',
          msg: '读取失败',
          data: null
        })
      }
      // 成功响应
      res.json({
        code: '0000',
        msg: '更新成功~~',
        data: data
      })
    })
  })
})


module.exports = router;
