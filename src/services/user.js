import NetService from "./netService";

const EP_REGISTER = 'register' ;

export default class UserService extends NetService {
	constructor(errHandler = null) {
		super(errHandler) ;
	}

	register(data) {
		return this.post(EP_REGISTER, data) ;
	}
}