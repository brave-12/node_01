var express = require('express');
var router = express.Router();

// 导入 jwt
const jwt = require('jsonwebtoken')
// 导入用户模型
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
// 导入配置项  方便直接从 config 更改
const {secret} = require('../../config/config')


// 登陆操作 
// 因为受到 CSRF 跨站请求影响  所以讲请求改为 post  并且 list.ejs 也要对应修改
router.post('/login',(req,res) => {
    // 获取用户名和密码
    let {username,password} = req.body
    // 查询数据库
    UserModel.findOne({username: username,password: md5(password)},(err,data) => {
        // 判断
        if(err){
            res.json({
                code: '2001',
                msg: '数据库读取失败',
                data: null
            })
            return
        }
        // 判断 data  错误则返回
        if(!data){
           return res.json({
                code: '2002',
                msg: '用户名或密码错误~~',
                data: null
            })
        }

        // 创建当前用户的 token
        // jwt.sign(数据, 加密字符串, 配置对象)
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        },secret,{  // 一周的秒数
            expiresIn: 60 * 60 * 24 * 7
        })
        // 响应 token
        res.json({
            code: '0000',
            msg: '登陆成功',
            data: token
        })


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
