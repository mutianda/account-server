var { conn ,app,Result}  = require('../index')
const tree = {}
app.post('/getRecord',  (req, res) => {
	console.log('add');
	let {startTime='' , endTime='',reason='',desc=''} = req.body
	let sql = `select * from account_record where account_time > ${startTime} and account_time < ${endTime}   `
	if(desc){
		sql +=`and account_desc LIKE '%${desc}%' `
	}
	if(reason){
		sql +=`and account_reason = '${reason}' `
	}
	sql+=` order by  account_time desc`
	console.log(sql);
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'查询成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error'}))
	})
})

app.post('/addRecord',  (req, res) => {
	console.log('add');
	let {money ,time, reason='',nemo=''} = req.body
	if(!time){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO account_record (account_reason,account_time,account_money,account_desc) VALUES ( '${reason}',  ${time} , ${money},'${nemo}')`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})
app.post('/editRecord',  (req, res) => {
	let {money ,time, reason='',nemo='',id} = req.body
	let sql = `UPDATE  account_record set account_desc = ${'\''+nemo+'\''},account_reason = ${'\''+reason+'\''},account_money = ${'\''+money+'\''} where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'编辑成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'编辑error',code:500}))
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
