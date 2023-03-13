import axios from "axios";

const CONTENT_JSON_HEADER = {
	headers: {
		'content-type': 'application/json'
	}
} ;

const API_SERVER = 'http://localhost' ;
const API_PORT = 3005 ;
const API_ROOT = '' ;

const API_URL = API_SERVER + ':' + API_PORT + API_ROOT ;

const API_REGISTER = API_URL + '/register' ;

export default class userService {
	constructor(errHandler = null) {
		this.errHandler = errHandler ;
	}

	errHandlerInternal(err) {
		if (this.errHandler) this.errHandler(err.message) ;
		else console.error(err) ;
		throw(err) ; // (rethrow)
	}

	errClearInternal() {
		this.errHandler(null) ;
	}

	register(data) {
		return axios.post(API_REGISTER, data, CONTENT_JSON_HEADER).then(() => this.errClearInternal()).catch((err) => this.errHandlerInternal(err)) ;
	}
}