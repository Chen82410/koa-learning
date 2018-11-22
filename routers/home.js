const router = require('koa-router')()
const controller = require('../controller/c-get.js')

router.get('/home', controller.getHome)

module.exports = router