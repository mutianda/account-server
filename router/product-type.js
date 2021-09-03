var { conn ,app,Result}  = require('../index')
let  tree = {}
app.post('/getProductType',  (req, res) => {

	let sql = `select * from product_type`
	conn(sql).then(row=>{
		if(row){
			// computeTree(tree,row,0)

			res.json(new Result({data:row,msg:'查询成功'}))
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
}
app.post('/addProductType',  (req, res) => {

	let {name} = req.body
	if(!name){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO product_type (type_name) VALUES ( ${'\''+name+'\''})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})
app.post('/updateProductType',  (req, res) => {
	let {name} = req.body
	let sql = `UPDATE  product_type set type_name = ${'\''+name+'\''} where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'编辑成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'编辑error'}))
	})
})
app.post('/delProductType',  (req, res) => {
	let { id} = req.body
	let sql = `delete from product_type  where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'删除成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'删除error'}))
	})
})
