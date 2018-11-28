const mongoose = require('mongoose')
const moment = require('moment')
const User = require('../model/user.js').User
const Article = require('../model/article.js')

exports.postReply = async(ctx) => {

  const body = ctx.request.body
  const content_id = mongoose.Types.ObjectId(body.content_id)
  let tempObj = {
    replier_id: '',
    reply_from: [],
    reply_time: '',
    reply_content: ''
  }
  
  let result = await User.findOne({account: body.reply_from}, {password: 0})
  // tempObj.reply_from[0] = await User.findById(result._id, {password: 0})
  let now = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  tempObj.replier_id = result._id
  tempObj.reply_time = now
  tempObj.reply_content = body.reply_content
  
  let res = await Article.findByIdAndUpdate(content_id, {$push: {replies: tempObj}})
  tempObj.reply_from[0] = await User.findById(result._id, {password: 0})
  if (res) {
    ctx.body = {
      retcode: 1,
      errMsg: "回复成功!"
    }
  } else {
    ctx.body = {
      retcode: 0,
      errMsg: "回复失败!"
    }
  }
}

// 获取帖子详情
exports.getInvitationDetail = async(ctx) => {
  console.log(ctx.query)
  let result = await Article.findById(ctx.query.content_id)
  // console.log(result)
  result.author[0] = await User.findById(result.author_id, {password: 0})
  // console.log(result)
  for (let item of result.replies) {
    item.reply_from[0] = await User.findById(item.replier_id, {password: 0})
  }
  if (result) {
    ctx.body = ctx.query.callback + `(${JSON.stringify(result)})`
  } else {
    ctx.body = {
      retcode: 0,
      errMsg: '查询失败!'
    }
  }
}