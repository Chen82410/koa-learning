const MongoClient = require('mongodb').MongoClient
const Config = require('../config/config.js')

class DB {
  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB()
    }
    return DB.instance
  }

  constructor() {
    this.dbClient = ''
    this.connect()
  }

  connect() {
    let that = this
    return new Promise((resolve, reject) => {
      if (!that.dbClient) {
        MongoClient.connect(Config.database.URL, (err, client) => {
          if (err) {
            reject(err)
          } else {
            that.dbClient = client.db(Config.database.NAME)
            resolve(that.dbClient)
          }
        })
      } else {
        resolve(that.dbClient)
      }
    })
  }

  find(collection, json, option) {
    return new Promise((resolve, reject) => {
      this
        .connect()
        .then((db) => {
          let result = null
          if (collection === 'article' && option) {
            result = db
              .collection(collection)
              .find(json)
              .limit(option.dataCount)
              .skip((option.pageNum - 1) * option.dataCount)
              .sort({"_id": -1})
          } else {
            result = db
              .collection(collection)
              .find(json)
          }
          result.toArray((err, docs) => {
            if (err) {
              reject(err)
              return
            } else {
              resolve(docs)
            }
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  count(collection, json) {
    return new Promise((resolve, reject) => {
      this
        .connect()
        .then((db) => {
          let result = db
            .collection(collection)
            .find(json)
            .count()
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  add(collection, json) {
    return new Promise((resolve, reject) => {
      this
        .connect()
        .then(db => {
          let result = db
            .collection(collection)
            .insertOne(json)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  update(collection, personal_msg, account) {
    return new Promise((resolve, reject) => {
      this
        .connect()
        .then(db => {
          if (account && collection === 'user') {
            let result = db
              .collection(collection)
              .updateOne({
                "account": account
              }, {$set: {
                  "nickname": personal_msg.nickname,
                  "signature": personal_msg.signature,
                  "birthday": personal_msg.birthday,
                  "gender": personal_msg.gender
                }})
            resolve(result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  updateFavor(collection, content_id, favor_type, praiser) {
    let result = {}
    return new Promise((resolve, reject) => {
      this
        .connect()
        .then(db => {
          if (favor_type) {//点赞
            result = db
            .collection(collection)
            .updateOne({
              "_id": content_id
            }, {$push: {
                  praiser
              }})
          } else { //取消点赞
            result = db
            .collection(collection)
            .updateOne({
              "_id": content_id
            }, {$pull: {
                  praiser
              }})
          }          
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  updateFavoCount(collection, content_id, favor_type) {
    return new Promise((resolve, reject) => {
      this
        .connect()
        .then(db => {
          let result = {}
          // console.log(typeof parseInt(favor_type), favor_type)
          if (parseInt(favor_type)) { //点赞
            result = db
              .collection(collection)
              .updateOne({
                "_id": content_id
              }, {
                $inc: {
                  favor_cnt: 1
                }
              })
          } else { //取消点赞
            result = db
              .collection(collection)
              .updateOne({
                "_id": content_id
              }, {
                $inc: {
                  favor_cnt: -1
                }
              })
          }
          resolve(result)
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
    })
  }

  updateArticle(collection, replies, content_id) {
    return new Promise((resolve, reject) => {
      this
        .connect()
        .then(db => {
          let result = db
            .collection(collection)
            .updateOne({
              "_id": content_id
            }, {$push: {
                replies
              }})
          resolve(result)
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
    })
  }
}

module.exports = DB.getInstance()