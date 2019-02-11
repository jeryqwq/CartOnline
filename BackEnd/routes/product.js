const router = require('koa-router')()
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')
var moment = require('moment');

router.get('/addProduct', async (ctx, next) => {
  const params = ctx.query;
  const sql=`insert into cartinfo values(0,
    ${params.cateId},'${params.pingpai}','${params.title}','
    ${params.desc}',${params.status},${params.price},'
    ${params.img}','${params.subImgs}','${params.richText}
    ',0,'${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}')`
  const res=await query(sql);
  if(res){
    ctx.body=ServerSuccess(res)
  }else{
    ctx.body=ServerFail("数据插入失败！！！")
  }
})
//参数:where:查询条件 pageSize:页面大小  pageNum:第几页 orderBy排序方式
router.get('/getProduct',async(ctx)=>{
  const params =ctx.query;
  const sql=`select id,pingpai,title,'desc',status,price,img,review from cartinfo
   where ${params.where} 
   order by ${params.orderBy} 
  limit ${params.pageSize*(params.pageNum-1)},${params.pageSize}`
  const res=await query(sql);
  if(res.length>0){
    ctx.body=ServerSuccess(res)
  }else{
    ctx.body=ServerFail("查询结果为空")
  }
})




module.exports = router
