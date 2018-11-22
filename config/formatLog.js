// formatLog.js
let formatError = (ctx, err, costTime) => {
  // console.log(ctx)
  let method = ctx.request.method
  let url = ctx.request.url
  let body = ctx.body || ctx.query
  let userAgent = ctx.header.userAgent
  return {method, url, body, costTime, err}
}
let formatRes = (ctx, costTime) => {
  let method = ctx.request.method
  let url = ctx.request.url
  let body = ctx.body || ctx.query
  let response = ctx.response
  return {method, url, body, costTime, response}
}
module.exports = {
  formatError,
  formatRes
}