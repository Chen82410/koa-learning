const router = require('koa-router')()
const controller = require('../controller/c-reply.js')

router.post('/reply', controller.postReply)
router.get('/invitation_detail', controller.getInvitationDetail)

module.exports = router