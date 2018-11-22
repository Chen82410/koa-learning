const log4js = require('log4js')
log4js.configure({
  appenders: {
    error: {
      type: 'file', //日志类型
      category: 'errLogger', //日志名称
      filename: __dirname + '/../logs/error.log/', //日志输出位置，当目录文件或文件夹不存在时自动创建
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100 //当文件内容超过文件存储空间时，备份文件的数量
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: __dirname + '/../logs/responses/',
      pattern: 'yyyy-MM-dd.log', //日志输出模式
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 100
    }
  },
  categories: {
    error: {
      appenders: ['error'],
      level: 'error'
    },
    response: {
      appenders: ['response'],
      level: 'info'
    },
    default: {
      appenders: ['response'],
      level: 'info'
    }
  },
  replaceConsole: true
})

// log4js.js
const {formatError, formatRes} = require('./formatLog')
const log2db = require('../lib/log2db')
let logger = {}
let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')
// 封装错误日志
logger.errLogger = (ctx, error, resTime) => {
  if (ctx && error) {
    log2db('ErrorRequest', 'error', formatError(ctx, error, resTime))
    errorLogger.error(formatError(ctx, error, resTime))
  }
}
// 封装相应日志
logger.resLogger = (ctx, resTime) => {
  if (ctx) {
    log2db('RequestInfo', 'info', formatRes(ctx, resTime))
    resLogger.info(formatRes(ctx, resTime))
  }
}

log4js.errLogger = logger.errLogger
log4js.resLogger = logger.resLogger

module.exports = log4js