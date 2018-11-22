const User = require('../model/user.js').User
const Article = require('../model/article.js')
const moment = require('moment')

exports.postContent = async(ctx) => {
  console.log(ctx.request.body)
  let content_msg = {}
  content_msg.article_msg = JSON.parse(ctx.request.body.article_msg)
  content_msg.article_msg.create_time = moment(Date.now()).format('YYYY-MM-DD HH:mm')

  let user = await User.findOne({account: ctx.request.body.author_account})
  console.log(user)
  if (user) {
    content_msg.author = user
    let result = await Article.create(content_msg)
    console.log(result)
    if (result) {
      ctx.body = {
        retcode: 1,
        errMsg: '发送成功!'
      }
    } else {
      ctx.body = {
        retcode: 0,
        errMsg: '发送失败!请稍后重试!'
      }
    }
  } else {
    ctx.body = {
      retcode: 0,
      errMsg: '发送失败!请稍后重试!'
    }
  }
}