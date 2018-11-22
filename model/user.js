const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  avatar: {
    type: String,
    default: 'http://localhost:3002/default_avatar.jpg'
  },
  account: String,
  password: String,
  create_time: {
    type: Date,
    default: Date.now()
  },
  nickname: {
    type: String,
    default: '狗蛋'
  },
  signature: String,
  birthday: {
    type: Date,
    default: Date.now()
  },
  gender: String
})

const User = mongoose.model('users', UserSchema)

module.exports.User = User
module.exports.UserSchema = UserSchema

