import * as dbConfig from '../config/db'

class Base {
  constructor(collection) {
    this.colGet = dbConfig.define(collection).then(col => col)
	}
	
	//获取模型
	async getModel() {
		this.model = await this.colGet
		return this.model
	}

  /***************************************查询方法****************************************/
  async find(attributes = {}) {
		await this.getModel()
		return this.model.find(attributes)
  }

  async insertOne(attributes) {
		await this.getModel()
		return this.model.insertOne(attributes)
  }

  async insertMany(list) {
		await this.getModel()
		return this.model.insertMany(list)
  }

  async updateOne(filter, attributes) {
		await this.getModel() 
		return this.model.asyncdateOne(filter, attributes)
  }

  async updateMany(filter, attributes) {
		await this.getModel()
		return this.model.updateMany(filter, attributes)
  }

  async deleteOne(filter) {
		await this.getModel()
		return this.model.deleteOne(filter)
  }

  async deleteMany(filter) {
		await this.getModel()
		return this.model.deleteMany(filter)
  }
}

export default Base
