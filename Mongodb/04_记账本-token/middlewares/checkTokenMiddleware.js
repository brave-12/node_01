const jwt = require('jsonwebtoken')
// 声明中间件
// 读取配置项
const {secret} = require('../config/config')
module.exports = function(req,res,next){
    // 获取 token
    let token = req.get('token')
    // 判断
    if (!token) {
      return res.json({
        code: '2003',
        msg: 'token 缺失',
        data: null
      })
    }
    // 校验 token
    jwt.verify(token, secret, function (err,data) {
      // 检测 token 是否正确
      if (err) {
        return res.json({
          code: '2004',
          msg: 'token 校验失败~~',
          data: null
        })
      }
      // 保存用户信息
      req.user = data
      // 如果 token 校验成功  执行后续
      next()
    })
  }