
import BaseModel from './base'
class Journal extends BaseModel {
	constructor() {
		super('journal');
		super.getModel();
	}
}

export default Journal