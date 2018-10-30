const router = require('koa-router')()
const controller = require('../controller/c-login.js')



router.post('/login', controller.postLogin)


module.exports = router