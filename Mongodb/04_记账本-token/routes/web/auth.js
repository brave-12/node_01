var express = require('express');
var router = express.Router();

// 导入用户模型
const UserModel = require('../../models/UserModel')
const md5 = require('md5')

// 注册
router.get('/reg',(req,res) => {
    // 响应 HTML 内容
    res.render('auth/reg')
})

// 注册用户
router.post('/reg',(req,res) => {
    // 获取请求体的数据
    // 密码 md5 加密  如果验证的话把传过来的密码加密然后跟数据库密码比较即可
    UserModel.create({...req.body,password: md5(req.body.password)},(err,data) => {
        if(err){
            res.status(500).send('注册失败，请稍后再试')
            return
        }
        res.render('success',{msg: '注册成功',url: '/login'})
    })
})

// 登陆页面
router.get('/login',(req,res) => {
    // 响应对应 HTML 页面内容
    res.render('auth/login')
})

// 登陆操作 
// 因为受到 CSRF 跨站请求影响  所以讲请求改为 post  并且 list.ejs 也要对应修改
router.post('/login',(req,res) => {
    // 获取用户名和密码
    let {username,password} = req.body
    // 查询数据库
    UserModel.findOne({username: username,password: md5(password)},(err,data) => {
        // 判断
        if(err){
            res.status(500).send('登陆失败，请稍后再试')
            return
        }
        // 判断 data  错误则返回
        if(!data){
            return res.send('账号或密码错误')
        }

        // 写入 session
        req.session.username = data.username
        req.session._id = data._id

        // 登陆成功响应 并跳转回 account 界面
        res.render('success',{msg:'登陆成功' ,url: '/account'})
    })

})

// 退出登陆
router.post('/logout',(req,res) => {
    // 销毁 session  并且提供一个跳转到登陆页面的重定向页面
    req.session.destroy(() => {
        res.render('success',{msg:'退出成功',url: '/login'})
    })
})



module.exports = router;
