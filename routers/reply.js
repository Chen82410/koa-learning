const router = require('koa-router')()
const controller = require('../controller/c-reply.js')

router.post('/reply', controller.postReply)

module.exports = router