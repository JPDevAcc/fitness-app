import NetService from "./netService";

const EP_REGISTER = 'register';
const EP_AUTH = 'auth';
const EP_LOGOUT = 'logout';

export default class UserService extends NetService {
	login(email, password) {
		return this.post(EP_AUTH, { email, password })
	}

	register(data) {
		return this.post(EP_REGISTER, data);
	}

	logout() {
		return this.post(EP_LOGOUT)
	}
}