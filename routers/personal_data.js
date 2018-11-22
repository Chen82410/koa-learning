const router = require('koa-router')()
const controller = require('../controller/c-personalData.js')
const controllerGet = require('../controller/c-get.js')

router.post('/personal_data/avatar', controller.postPersonalData)
router.post('/personal_data/personal_msg', controller.postPersonalData)
router.get('/personal_msg', controllerGet.getPersonalMsg)

module.exports = router