const mongoose = require('mongoose')
const Article = require('../model/article.js')

// 点赞
exports.getFavor = async(ctx, next) => {

  const query = ctx.query
  const content_id = mongoose
    .Types
    .ObjectId(query.content_id)
  let result = {}
  let favor_type = parseInt(query.favor_type)  
  let obj = {    
    $inc: {
      favor_cnt: favor_type ? favor_type : (favor_type-1)
    },
    $set: {
      is_my_favor: favor_type
    }
  }
  if (favor_type) {
    obj.$push = {praiser: query.account}
  } else {
    obj.$pull = {praiser: query.account}
  }  
  await Article.findByIdAndUpdate(content_id, obj)
  result = {
    retcode: 1,
    errMsg: favor_type ? '点赞成功!' : '取消点赞成功!'
  }
  // ctx.body = await query.callback + `(${JSON.stringify(result)})`
  ctx.body = await result
  await next()
}