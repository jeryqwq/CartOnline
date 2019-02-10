const router = require('koa-router')()
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')

router.get('/getCategory', async (ctx, next) => {
  const res= await query(`select * from category`);
  if(res.length>0){
      ctx.body=ServerSuccess(res);
  } else{
    ctx.body=ServerFail('数据异常');
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
