import NetService from "../netService";

const EP_REGISTER = 'register';
const EP_AUTH = 'auth';
const EP_LOGOUT = 'logout';
const EP_CHANGEPASS = 'changepass';
const EP_DELACCOUNT = 'delaccount';

export default class UserService extends NetService {
	login(email, password) {
		return this.post(EP_AUTH, { email, password })
	}

	register(data) {
		return this.post(EP_REGISTER, data);
	}

	logout() {
		return this.post(EP_LOGOUT, {});
	}

	changePwd(currentPwd, newPwd) {
		return this.post(EP_CHANGEPASS, { currentPwd, newPwd });
	}

	deleteAccount(currentPwd) {
		return this.post(EP_DELACCOUNT, { currentPwd });
	}
}