const router = require('koa-router')()
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')


router.get('/product', async (ctx, next) => {
  ctx.body = 'koa2 string'
})



module.exports = router
