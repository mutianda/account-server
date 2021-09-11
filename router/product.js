var { conn ,app,Result}  = require('../index')
let  tree = {
	id:0,
	name:'全部'
}
app.post('/getProduct',  (req, res) => {

	let sql = `select * from product_name`
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
app.post('/addProduct',  (req, res) => {

	let {name,pid=0} = req.body
	if(!name){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO product_name (name,pid) VALUES ( ${'\''+name+'\''},${pid})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})
app.post('/addProductByList',  (req, res) => {

	let {list} = req.body
	if(!list.length){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	const arr = []
	list.forEach(name=>{
		arr.push(`( ${'\''+name+'\''})`)
	})
	let sql = `INSERT INTO product_name (name) VALUES `
	sql+=arr.join(' , ')
	console.log(sql);
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'批量新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})
app.post('/updateProduct',  (req, res) => {
	let {name} = req.body
	let sql = `UPDATE  product_name set name = ${'\''+name+'\''} where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'编辑成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'编辑error'}))
	})
})
app.post('/delProduct',  (req, res) => {
	let { id} = req.body
	let sql = `delete from product_name  where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'删除成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'删除error'}))
	})
})
