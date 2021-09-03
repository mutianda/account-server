var { conn ,app,Result}  = require('../index')
let  tree = {}
app.post('/getAccountProduct',  (req, res) => {
	let {name='' , type='',keyword=''} = req.body
	let sql = `select * from account_product  where pro_name !='' `
	if(name){
		sql +=` and pro_name =  '${name}'    `
	}
	if(type){
		sql +=`and pro_type = '${type}' `
	}
	if(keyword){
		sql +=`and pro_name LIKE '%${keyword}%' `
	}
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
app.post('/addAccountProduct',  (req, res) => {

	let {name,price=0,num=0,type} = req.body
	if(!name){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO account_product (pro_name , pro_price , pro_num , pro_type) VALUES ( ${'\''+name+'\''} , ${'\''+price+'\''} ,${'\''+num+'\''},${'\''+type+'\''})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})
app.post('/addAccountProductByList',  (req, res) => {

	let {list} = req.body
	if(!list.length){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO account_product (pro_name , pro_price , pro_num , pro_type) VALUES ( ${'\''+name+'\''} , ${'\''+price+'\''} ,${'\''+num+'\''},${'\''+type+'\''})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})
app.post('/updateAccountProduct',  (req, res) => {
	let {name,price=0,num=0,type,id} = req.body
	let sql = `UPDATE  account_product set pro_name = ${'\''+name+'\''},pro_price = ${'\''+price+'\''},pro_num = ${'\''+num+'\''},pro_type = ${'\''+type+'\''} where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'编辑成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'编辑error'}))
	})
})
app.post('/delAccountProduct',  (req, res) => {
	let { id} = req.body
	let sql = `delete from account_product  where id = ${id}`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'删除成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'删除error'}))
	})
})
