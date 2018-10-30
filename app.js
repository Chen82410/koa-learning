const CONFIG = require('./config/config.js')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const app = new Koa()


app.use(cors())
app.use(bodyParser())
app.use(require('./routers/login.js').routes()).use(require('./routers/login.js').allowedMethods())

app.listen(CONFIG.port)