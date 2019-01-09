const md5 = require('md5')
const User = require('../model/user.js').User

exports.postRegister = async(ctx, next) => {
  const result = await User.findOne({account: ctx.request.body.account})
  // console.log('result:', result)
  if (!result) {
    await User.create({
      account: ctx.request.body.account,
      password: md5(ctx.request.body.password)
    })
    ctx.body = {
      retcode: 1,
      errMsg: "注册成功!"
    }
  } else {
    ctx.body = {
      retcode: 1,
      errMsg: "用户已注册!"
    }
  }
  await next()
}