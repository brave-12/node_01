// 声明检测登陆的中间件
module.exports = (req,res,next) => {
    // 判断 如果没有对应 session   则跳转到登陆页面
    if(!req.session.username){
      return res.redirect('/login')
    }
    // 如果通过则执行后续
    next()
  }