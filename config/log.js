const mongoose = require('mongoose')
const Schema = mongoose.Schema

const db = mongoose.connect("mongodb://127.0.0.1:27017/Koa")

let log = new Schema({
  level: {
    type: String
  },
  message: {
    type: String
  },
  info: {
    method: String,
    url: String,
    costTime: Number,
    body: String,
    response: {
      status: Number,
      message: String,
      header: String,
      body: String
    }
  }
}, {versionKey: false})

module.exports = mongoose.model('logs', log)