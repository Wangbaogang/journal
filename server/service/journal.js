import BaseService from './base'
import { autoWrite } from './utils'
import { ObjectId } from 'mongodb'

@autoWrite('journal')
class JournalModel extends BaseService {
  constructor() {
    super(JournalModel.model)
  }

  async findJournalsByEmail(email, options = { limit: 5 }) {
    const cursor = await this.baseFind({ email })
    const journals = await cursor.limit(options.limit).toArray()
    console.log(journals, 'findJournalsByEmail')
    return journals
  }

  async findJournalById({ email, id }, options = {}) {
    const cursor = await this.baseFind(ObjectId(id))
    const journals = await cursor.limit(1).toArray()
    console.log(email, id, journals, 'findJournalByEmailAndId')
    return journals[0] || null
  }

  async createJournal(email, data, options = {}) {
    let { title, content } = data
    const cursor = await this.baseInsertOne({
      email,
      title,
      content
    })
    console.log('创建日志成功')
  }

  async updateJournal(email, data, options = {}) {
    let { title, content, _id } = data
    const cursor = await this.baseUpdateOne(
      { _id },
      {
        title,
        content
      }
    )
    console.log('编辑日志成功')
  }
}

export default new JournalModel()
