var { conn ,app,Result}  = require('../index')
let  tree = {}
app.post('/getAccountProduct',  (req, res) => {
	let {pid, type='',keyword=''} = req.body
	let sql = `select A.*,B.name as rack_name from account_product A left join rack_name B  on (A.rack_id=B.id) where A.pro_name !='' `
	if(type){
		sql +=`and A.pro_type = '${type}' `
	}
	if(keyword){
		sql +=`and A.pro_name LIKE '%${keyword}%' `
	}else {
		sql +=`and A.rack_id = '${pid}' `
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

	let {name,price=0,num=0,type,pid,sort=0} = req.body
	if(!name){
		res.json(new Result({code:0,msg:'参数不完整'}))
	}
	let sql = `INSERT INTO account_product (pro_name ,rack_id, pro_price , pro_num , pro_type,sort) VALUES ( ${'\''+name+'\''} , ${'\''+pid+'\''} , ${'\''+price+'\''} ,${'\''+num+'\''},${'\''+type+'\''},${'\''+sort+'\''})`
	conn(sql).then(row=>{
		if(row){
			res.json(new Result({data:row,msg:'新增成功'}))
		}
	}).catch(e=>{
		res.json(new Result({data:e,msg:'查询error',code:500}))
	})

})

app.post('/updateAccountProduct',  (req, res) => {
	let {name,price=0,num=0,type,id,sort=0} = req.body
	let sql = `UPDATE  account_product set pro_name = ${'\''+name+'\''},pro_price = ${'\''+price+'\''},pro_num = ${'\''+num+'\''},pro_type = ${'\''+type+'\''}, sort = '${sort}' where id = ${id}`
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
