var { conn ,app,Result}  = require('../index')
let  tree = {
	id:0,
	name:'全部'
}
app.post('/getRack',  (req, res) => {

	let sql = `select * from rack_name`
	conn(sql).then(row=>{
		if(row){

			 computeTree(tree,row,0)

			res.json(new Result({data:tree,msg:'查询成功'}))
		}
	}).catch(e=>{

		res.json(new Result({data:e,msg:'查询error'}))
	})
})
function computeTree(tree,list,val){

	tree.children = list.filter(item=>item.pid == val)

	tree.children.forEach(item=>{
		computeTree(item,list,item.id)
	})
	return tree
}
app.post('/addRack',  (req, res) => {

	let {name,pid=0,sort=0} = req.body
	if(!name){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO rack_name (name,pid,sort) VALUES ( ${'\''+name+'\''},${pid},${sort})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})

app.post('/updateRack',  (req, res) => {
	let {id,name,sort=0} = req.body
	let sql = `UPDATE  rack_name set name = ${'\''+name+'\''},sort = '${sort}' where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'编辑成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'编辑error'}))
	})
})
app.post('/delRack',  (req, res) => {
	let { id} = req.body
	let sql = `delete from rack_name  where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			conn(`delete from account_product  where rack_id = ${id}`).then(rr=>{

			})
		}
		res.json(new Result({data:row,msg:'删除成功'}))
	}).catch(e=>{
		res.json(new Result({data:e,msg:'删除error'}))
	})
})
