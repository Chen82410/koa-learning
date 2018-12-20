const fs = require('fs')
const User = require('../model/user.js').User
const path = require('path')
const config = require('../config/config.js')

exports.postPersonalData = async (ctx) => {
  // console.log(ctx)
  if (ctx.url === '/personal_data/avatar') {//头像
    const name = path.join(__dirname, '../public/avatars/')+ctx.request.body.account+'.'+ctx.request.body.image_type
    let dataBuffer = new Buffer(ctx.request.body.avatar, 'base64')
    let error = ''
    await fs.writeFileSync(name, dataBuffer, function (err) {
      if (err) {
        error = err
      }
    })
    if (error) {
      ctx.body = {
        retcode: 0,
        errMsg: err
      }
    } else {
      let result = await User.findOneAndUpdate({account: ctx.request.body.account}, {avatar: `${config.baseUrl + ctx.request.body.account}.${ctx.request.body.image_type}`})
      if (result) {
        ctx.body = {
          retcode: 1,
          errMsg: '上传成功!',
          avatarUrl: config.baseUrl + ctx.request.body.account + '.' +  ctx.request.body.image_type
        }
      }
    }
  } else if (ctx.url === '/personal_data/personal_msg') {//基本信息
    let result = await User.findOneAndUpdate({account: ctx.request.body.account}, JSON.parse(ctx.request.body.personal_msg))
    if (result) {
      ctx.body = {
        retcode: 1,
        errMsg: '提交成功!'
      }
    } else {
      ctx.body = {
        retcode: 0,
        errMsg: '提交失败!请稍后重试!'
      }
    }
  }
}