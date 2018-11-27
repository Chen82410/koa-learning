const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = require('./user.js').UserSchema

const ArticleSchema = new Schema({
  article_msg: {
    title: String,
    content: String,
    create_time: {
      type: Date,
      default: Date.now()
    }
  },
  favor_cnt: {
    type: Number,
    default: 0
  },
  author_id: String,
  author: [UserSchema],
  is_my_favor: Number,
  replies: [
    {
      reply_from: [UserSchema],
      reply_time: {
        type: Date,
        default: Date.now()
      },
      reply_content: String
    }
  ],
  praiser: Array
}, {versionKey: false})

const Article = mongoose.model('articles', ArticleSchema)

module.exports = Article