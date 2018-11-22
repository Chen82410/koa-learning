const router = require('koa-router')()
const controller = require('../controller/c-register.js')

router.post('/register', controller.postRegister)

module.exports = router