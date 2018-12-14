import { DB_NAME, DB_URL } from '../../config/db'
import MongoClient from 'mongodb'

/**
 * @param {string} collection_name 集合名称
 */
async function define(collection_name) {
  return MongoClient.connect(DB_URL).then(client => {
    console.log('connected successfully to database ' + collection_name)
    let db = client.db(DB_NAME, {
      useNewUrlParser: true
    })
    return db.collection(collection_name)
  })
}

export { define }
