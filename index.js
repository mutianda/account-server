var conn=require("./mysql.js");
var express = require('express');
var app = express();
var api = require('./api')

app.all('*', function(req, res, next) {             //设置跨域访问
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,X-Token,x-token,content-type");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
const bodyParser = require('body-parser')
const tree={

}
// json请求
app.use(bodyParser.json())
// 表单请求
app.use(bodyParser.urlencoded({extended: false}))
//配置服务端口
var server = app.listen(3030,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('listen at http://%s:%s',host,port)
})
function Result ({ code = 1, msg = '', data = '' }) {
	this.code = code;
	this.msg = msg;
	this.data = data;
}
module.exports ={conn,app,Result}