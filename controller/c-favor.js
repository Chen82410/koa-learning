const mongoose = require('mongoose')
const Article = require('../model/article.js')

// 点赞
exports.getFavor = async(ctx) => {

  const query = ctx.query
  const content_id = mongoose
    .Types
    .ObjectId(query.content_id)
  let result = {}

  if (parseInt(query.favor_type)) { //点赞
    await Article.findByIdAndUpdate(content_id, {
      $push: {
        praiser: query.account
      },
      $inc: {
        favor_cnt: 1
      },
      $set: {
        is_my_favor: query.favor_type
      }
    })
    result = {
      retcode: 1,
      errMsg: '点赞成功!'
    }
  } else { //取消点赞
    await Article.findByIdAndUpdate(content_id, {
      $pull: {
        praiser: query.account
      },
      $inc: {
        favor_cnt: -1
      },
      $set: {
        is_my_favor: query.favor_type
      }
    })
    result = {
      retcode: 1,
      errMsg: '取消点赞成功!'
    }
  }
  ctx.body = await query.callback + `(${JSON.stringify(result)})`

}