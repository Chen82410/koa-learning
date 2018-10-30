const DB = require('../lib/db.js')
const moment = require('moment')

exports.postLogin = async (ctx) => {  
  let hasLogin = false
  // console.log(ctx.request.body)    
  await DB.find('user', {"account": ctx.request.body.account})
  .then(res => {    
    if (JSON.stringify(res) !== '[]') {
      hasLogin = true
      ctx.body = {"errMsg": "用户已注册!"}
      return
    } else {
      hasLogin = false
    }
  })
  .catch(err => {
    ctx.body = {"errMsg": "注册失败!"}
  })

  if (!hasLogin) {
    let now = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    ctx.request.body.create_time = now
    await DB.add('user', ctx.request.body)
      .then(res => {
        // console.log(res)
        if (res.result.ok) {
          ctx.body = {"errMsg": "注册成功!"}
          return ctx.body    
        } else {
          ctx.body = {"errMsg": "注册失败!"}
          return ctx.body    
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
}