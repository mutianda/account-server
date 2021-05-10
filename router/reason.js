var { conn ,app,Result}  = require('../app')

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
