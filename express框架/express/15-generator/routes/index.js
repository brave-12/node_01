var express = require('express');
var router = express.Router();

const formidable = require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 显示网页表单
router.get('/portrait', function(req, res, next) {
  res.render('portrait');
});

// 处理文件上传   使用 formidable
router.post('/portrait', function(req, res, next) {
  // 创建表单对象
  const form = formidable({ 
    multiples: true ,
    // 设置上传文件的保存目录
    uploadDir: __dirname + '/../public/images',
    // 保持文件后缀
    keepExtensions: true
  });
  // 解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // 需要服务器保存该图片的访问 URL
    // 将来将此数据保存在数据库中
    let url = '/images/' + files.portrait.newFilename
    // res.json({ fields, files });

    // console.log(fields);  // 接收 text  radio  checkbox select 等等
    // console.log(files);  // 接收 file
    
    res.send(url)
  });
});

module.exports = router;
