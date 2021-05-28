var express=require('express');
var router=require('./router');

var app = express();
// 说明express框架的静态部分在public里
app.use(express.static('public'));
// 选择express项目中对于后缀名.html文件的前端配置框架为express-art-template
app.engine('html',require('express-art-template'));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(router)
app.listen(8014, function() {
    console.log("服务启动成功，请登录：http://127.0.0.1:8014");
});