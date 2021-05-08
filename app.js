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
var server = app.listen(3002,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('listen at http://%s:%s',host,port)
})
app.post('/getReason',  (req, res) => {
	console.log('add');
	let {pid , reason='',nemo=''} = req.body
	if(!reason||!pid){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `select * from account_reason`
	conn(sql).then(row=>{
		if(row){
			computeTree(tree,row,0)
			console.log(row,tree);
			res.json(new Result({data:tree,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error'}))
	})
})
function computeTree(tree,list,val){
	console.log(list);
	tree.children = list.filter(item=>item.pid == val)
	console.log(tree.children);
	tree.children.forEach(item=>{
		computeTree(item,list,item.id)
	})
}
app.post('/addReason',  (req, res) => {
	console.log('add');
	let {pid , reason='',nemo=''} = req.body
	if(!reason||!pid){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO account_reason (pid,reason,nemo) VALUES ( ${pid},${reason},${nemo})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error'}))
	})

})
app.post('/updateReason',  (req, res) => {
	let {pid , id,reason,nemo} = req.body
	let sql = `UPDATE  account_reason set reason = ${'\''+reason+'\''},nemo = ${'\''+nemo+'\''} where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'编辑成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'编辑error'}))
	})
})
app.post('/delReason',  (req, res) => {
	let { id} = req.body
	let sql = `delete from account_reason  where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'删除成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'删除error'}))
	})
})
function Result ({ code = 1, msg = '', data = '' }) {
	this.code = code;
	this.msg = msg;
	this.data = data;
}