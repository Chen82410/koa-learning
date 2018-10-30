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

  find(collection, json) {
    return new Promise((resolve, reject) => {
      this.connect()
      .then((db) => {
        let result = db.collection(collection).find(json)
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

  add(collection, json) {
    return new Promise((resolve, reject) => {
      this.connect()
      .then(db => {
        let result = db.collection(collection).insertOne(json)
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
    })
  }
}


module.exports = DB.getInstance()