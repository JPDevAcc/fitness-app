import NetService from "./netService";

const EP_REGISTER = 'register';

export default class UserService extends NetService {
	login(email, password) {
		return this.post('auth', { email, password })
	}

	register(data) {
		return this.post(EP_REGISTER, data);
	}

	logout() {

		return this.post('logout', {})
	}

}