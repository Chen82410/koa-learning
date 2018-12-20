const User = require('../model/user.js').User
const Article = require('../model/article.js')

// 首页帖子
exports.getHome = async(ctx) => {
  // console.log(ctx) console.log(ctx.query)
  let query = ctx.query
  let pageNum = Number(query.page_number)
  let dataCount = Number(query.data_count)
  let result = {}
  
  let totalCount = await Article.count() 
  if (totalCount) result.totalCount = totalCount

  result.data = await Article.find().skip((pageNum - 1) * dataCount).limit(dataCount).sort({"_id": -1})
  for (let item of result.data) {
    if (item.praiser && item.praiser.indexOf(ctx.query.account) > -1) {
      item.is_my_favor = 1
    } else {
      item.is_my_favor = 0
    }
    item.author[0] = await User.findById(item.author_id, {password: 0})
  }
  ctx.body = await ctx.query.callback + `(${JSON.stringify(result)})`
}

// 个人信息
exports.getPersonalMsg = async(ctx) => {
  // console.log(ctx.request)
  console.log(ctx.query)
  let result = await User.findOne({account: ctx.query.account}, {password: 0})
  if (result) {
    ctx.body = ctx.query.callback + `(${JSON.stringify(result)})`
  } else {
    ctx.body = {
      retcode: 0,
      errMsg: '获取用户信息失败!'
    }
  }
}