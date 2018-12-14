class BaseService {
	constructor(instance) {
		this.instance = instance
	}

	async baseFind(attributes = {}) {
		return await this.instance.find(attributes) 
	}

	async baseInsertOne(attributes) {
		return await this.instance.insertOne(attributes)
	}

	async baseInsertMany(list) {
		return await this.instance.insertMany(list)
	}

	async baseUpdateOne(filter, attributes) {
		return await this.instance.updateOne(filter, attributes)
	}

	async baseUpdateMany(filter, attributes) {
		return await this.instance.updateMany(filter, attributes)
	}

	async baseDeleteOne(filter) {
		return await this.instance.deleteOne(filter)
	} 

	async baseDeleteMany(filter) {
		return await this.instance.deleteMany(filter)
	}
}

export default BaseService