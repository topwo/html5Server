var util = require('./util');
var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var DAO = require('./DAO');


var app = express();
var server = require('http').createServer(app);

app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* GET users listing. */
app.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.render('updateUser');
});

//用户注册
app.post('/register', function(req, res, next) {
    DAO.register(req, res, next);
});

//用户登陆
app.post('/login', function(req, res, next) {
    DAO.login(req, res, next);
});

//选区
app.post('/select_server', function(req, res, next) {
    DAO.selectServer(req, res, next);
});

//注册区
app.post('/register_server', function(req, res, next) {
    DAO.registerServer(req, res, next);
});

//招募新兵
app.post('/recruit_start', function(req, res, next) {
console.log(req.body);
	var data = '{"type":'+(Math.floor(Math.random()*3) + 1)
				+',"full_hp":'+100
				+'}';
    util.returnJson(res, {code:'0',msg:'招募新兵开始',data:data});
});
app.get('/recruit_start', function(req, res, next) {
console.log(req.query);
	var data = '{"type":'+(Math.floor(Math.random()*3) + 1)
				+',"full_hp":'+100
				+'}';
    util.returnJson(res, {code:'0',msg:'招募新兵开始',data:data});
});

server.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

});

//module.exports = app;