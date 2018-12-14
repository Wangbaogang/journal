import UserModel from '../model/user'
import JourmalModel from '../model/journal'

export function autoWrite(model_name) {
	if (!model_name) throw Error("which model do you want?")
	return function (target) {
		let model
		switch (model_name) {
			case 'user':
				model = new UserModel()
				break
			case 'journal':
				model = new JourmalModel()
				break
		}
		target.model = model
	}
}
