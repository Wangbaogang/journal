import BaseService from './base'
import { autoWrite } from './utils'

@autoWrite('user')
class UserService extends BaseService {
  constructor() {
    super(UserService.model)
  }

  // 通过邮箱地址查找用户
  async findUserByEmail(email) {
    const cursor = await this.baseFind({ email })
    const users = await cursor.limit(1).toArray()
    if (users.length) return users[0]
    return null
  }

  async findUser(email, password) {
    const cursor = await this.baseFind({ email, password })
    const users = await cursor.limit(1).toArray()
    if (users.length) return users[0]
    return null
  }

  //添加未激活的新用户
  async addUnActiveUser({ userName, email, password }) {
    let ret
    try {
      ret = await this.baseInsertOne({
        userName,
        email,
        password,
        active: false
      })
    } catch (e) {
      throw e
    }
    return ret
  }
}

export default new UserService()
