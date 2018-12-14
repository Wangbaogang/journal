
import BaseModel from './base'

class User extends BaseModel {
	constructor() {
		super('user');
		super.getModel();
	}
}

export default User