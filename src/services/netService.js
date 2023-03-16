import axios from "axios";

const CONTENT_JSON = {
	'content-type': 'application/json'
} ;

const API_URL = process.env.REACT_APP_API_URL ;

export default class NetService {
	constructor({errHandler = null, tokenProvider = null, logoutHandler = null} = {}) {
		console.log(arguments) ;
		this.errHandler = errHandler ;
		this.tokenProvider = tokenProvider ;
		this.logoutHandler = logoutHandler ;

		axios.defaults.withCredentials = true ; // Send cookies
	}

	errHandlerInternal(err) {
		// If we got an unauthorized / forbidden status response then treat it as a log-out
		if (err.response.status === 401 || err.response.status === 403) {
			if (this.logoutHandler) {
    		this.logoutHandler();
				return ;
			}
  	}

		if (this.errHandler) this.errHandler(err.message) ;
		else console.error(err) ;
		throw(err) ; // (rethrow)
	}

	errClearInternal() {
		if (this.errHandler) this.errHandler(null) ;
	}

	request(method, url, data = null, extraHeaders = {}) {
		let headers = {}
		if (this.tokenProvider) headers.token = this.tokenProvider() ;
		headers = {...headers, ...extraHeaders} ;
		console.log(headers) ;

		return axios({method, url, data, headers}).then(() => this.errClearInternal()).catch((err) => this.errHandlerInternal(err)) ;
	}

	// Empty-body functions
	get(epUrl) {
		return this.request('get', API_URL + epUrl) ;
	}
	delete(epUrl) {
		return this.request('delete', API_URL + epUrl) ;
	}

	// JSON functions
	post(epUrl, data = null) {
		return this.request('post', API_URL + epUrl, data, CONTENT_JSON) ;
	}
	put(epUrl, data = null) {
		return this.request('put', API_URL + epUrl, data, CONTENT_JSON) ;
	}
	patch(epUrl, data = null) {
		return this.request('patch', API_URL + epUrl, data, CONTENT_JSON) ;
	}

	// FormData functions
	postFormData(epUrl, data) {
		if (!(data instanceof FormData)) {
			console.error('Not a FormData object') ;
			return null ;
		}
		return axios.post(API_URL + epUrl, data) ;
	}
}