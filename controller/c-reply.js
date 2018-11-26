const mongoose = require('mongoose')
const moment = require('moment')
const User = require('../model/user.js').User
const Article = require('../model/article.js')

exports.postReply = async(ctx) => {

  const body = ctx.request.body
  const content_id = mongoose.Types.ObjectId(body.content_id)
  let tempObj = {
    reply_from: [],
    reply_time: '',
    reply_content: ''
  }
  
  let result = await User.findOne({account: body.reply_from})
  let now = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  tempObj.reply_from.push(result)
  tempObj.reply_time = now
  tempObj.reply_content = body.reply_content
  
  let res = await Article.findByIdAndUpdate(content_id, {$push: {replies: tempObj}})
  if (res) {
    ctx.body = Object.assign(tempObj, {
      retcode: 1,
      errMsg: "回复成功!"
    })
  } else {
    ctx.body = {
      retcode: 0,
      errMsg: "回复失败!"
    }
  }
}

// 获取帖子详情
exports.getInvitationDetail = async(ctx) => {
  let result = await Article.findById(ctx.query.content_id)
  if (result) {
    ctx.body = ctx.query.callback + `(${JSON.stringify(result)})`
  } else {
    ctx.body = {
      retcode: 0,
      errMsg: '查询失败!'
    }
  }
}