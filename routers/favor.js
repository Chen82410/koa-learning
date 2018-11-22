const router = require('koa-router')()
const controller = require('../controller/c-favor.js')

router.get('/favor', controller.getFavor)

module.exports = router