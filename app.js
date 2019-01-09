const CONFIG = require('./config/config.js')
const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const koaBody = require('koa-body')
const static = require('koa-static')
const log4js = require('./config/log4js')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Koa', {
  config: {
    autoIndex: false
  }
})

const app = new Koa()

app.use(koaBody({
  multipart: true,
  formLimit:"5mb",
  jsonLimit:"5mb",
  textLimit:"5mb"
}))

// app.use(async(ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   log4js.resLogger(ctx, ms)
// })

// app.on('error', (err, ctx) => {
//   log4js.errLogger(ctx, err)
//   console.error('server error', err, ctx)
// })

const koaOptions = {
  origin: true,
  credentials: true,
  multipart: true
};

app.use(cors(koaOptions))
// app.use(bodyParser())

const allowPage = ['/register', '/login']

app.use(async(ctx,next) => {
  // console.log(ctx.url)
  let url = ctx.url.split('?')[0]
  
  let static = url.endsWith('.gif') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.ico')

  console.log(static)
  if (allowPage.includes(url) || static) {
    
  } else {
    if (!ctx.header.authorization) {
      ctx.body = {
        errcode: 3,
        errMsg: '用户未登录'
      }
      return
    }
  } 
  await next() 
})

app
  .use(require('./routers/register.js').routes())
  .use(require('./routers/register.js').allowedMethods())

app
  .use(require('./routers/login.js').routes())
  .use(require('./routers/login.js').allowedMethods())

app
  .use(require('./routers/home.js').routes())
  .use(require('./routers/home.js').allowedMethods())

app
  .use(require('./routers/personal_data.js').routes())
  .use(require('./routers/personal_data.js').allowedMethods())

app
  .use(require('./routers/content.js').routes())
  .use(require('./routers/content.js').allowedMethods())

app
  .use(require('./routers/reply.js').routes())
  .use(require('./routers/reply.js').allowedMethods())

app
  .use(require('./routers/favor.js').routes())
  .use(require('./routers/favor.js').allowedMethods())

app.use(static('./public/avatars/'))

app.listen(CONFIG.port)