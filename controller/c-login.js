const md5 = require('md5')
const User = require('../model/user.js').User

exports.postLogin = async(ctx, next) => {

  let result = await User.findOne({account: ctx.request.body.account})
  console.log(result)
  if (!result) { //未注册
    ctx.body = {
      retcode: 0,
      errMsg: "该账户还未注册!"
    }
  } else {
    if (result.password === md5(ctx.request.body.password)) {
      ctx.body = {
        retcode: 1,
        errMsg: "登陆成功!"
      }
    } else {
      ctx.body = {
        retcode: 2,
        errMsg: "密码错误!"
      }
    }
  }
  await next()
}