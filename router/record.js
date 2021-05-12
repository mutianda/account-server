var { conn ,app,Result}  = require('../index')
const tree = {}
app.post('/getRecord',  (req, res) => {
	console.log('add');
	let {startTime='' , endTime=''} = req.body
	let sql = `select * from account_record`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error'}))
	})
})

app.post('/addRecord',  (req, res) => {
	console.log('add');
	let {money ,time, reason='',desc=''} = req.body
	if(!reason||!pid){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO account_record (account_reason,account_desc,account_time,account_money) VALUES ( ${reason},${desc},${time},${money})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error'}))
	})

})
app.post('/updateRecord',  (req, res) => {
	let {money ,time, reason='',desc=''} = req.body
	let sql = `UPDATE  account_record set account_reason = ${'\''+reason+'\''},account_desc = ${'\''+desc+'\''},account_money = ${'\''+money+'\''} where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'编辑成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'编辑error'}))
	})
})
app.post('/delRecord',  (req, res) => {
	let { id} = req.body
	let sql = `delete from account_record  where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'删除成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'删除error'}))
	})
})
