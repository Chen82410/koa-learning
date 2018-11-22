const router = require('koa-router')()
const controller = require('../controller/c-content.js')

router.post('/content', controller.postContent)

module.exports = router