import axios from "axios";

const CONTENT_JSON = {
	'content-type': 'application/json'
};

const SLOW_REQUEST_THRESHOLD_MS = 300 ;

const API_URL = process.env.REACT_APP_API_URL;

export default class NetService {
	constructor({
		errHandler = null,
		tokenProvider = null,
		logoutHandler = null,
		handleSlowRequestDetect = null,
		handleSlowRequestComplete = null} = {}) {
		this.errHandler = errHandler;
		this.tokenProvider = tokenProvider;
		this.logoutHandler = logoutHandler;
		this.handleSlowRequestDetect = handleSlowRequestDetect;
		this.handleSlowRequestComplete = handleSlowRequestComplete;

		axios.defaults.withCredentials = true; // Send cookies
	}

	errHandlerInternal(err) {
		// If we got an unauthorized / forbidden status response then treat it as a log-out (if code also correct)
		if ((err.response.status === 401 || err.response.status === 403) && err.response.data.code === 'NOT_AUTHORIZED') {
			if (this.logoutHandler) {
				this.logoutHandler();
				return;
			}
		}

		if (this.errHandler) this.errHandler(err.response.status, err.response.statusText, err.response.data.message);
		else console.error(err.response.status + " : " + err.response.statusText);
		throw (err); // (rethrow)
	}

	errClearInternal() {
		if (this.errHandler) this.errHandler(null);
	}

	request(method, url, data = null, extraHeaders = {}, opts = {}) {
		let isSlowRequest = false ;
		if (this.handleSlowRequestDetect) {
			setTimeout(() => {
				isSlowRequest = true ;
				console.log("SLOW") ;
				this.handleSlowRequestDetect() ;
			}, SLOW_REQUEST_THRESHOLD_MS) ;
		}

		let headers = {}
		if (this.tokenProvider) headers.token = this.tokenProvider() ;
		headers = {...headers, ...extraHeaders} ;
		if (method !== 'get') headers['X-Requested-With'] = 'XMLHttpRequest' ; // (to allow for some minimal CSRF protection on non-safe requests)
		if (data === null) delete headers['content-type'] ; // (don't set content-type if no data)
		const axiosData = (data === null) ? {method, url, headers} : {method, url, data, headers} ;
		return axios(axiosData).then((response) => {
			console.log("REQUEST COMPLETED (success)") ;
			if (isSlowRequest && this.handleSlowRequestComplete) this.handleSlowRequestComplete() ;
			if (!opts.noErrorClear) this.errClearInternal() ;
			return response ;
		}).catch((err) => {
			console.log("REQUEST COMPLETED (failure)") ;
			if (isSlowRequest && this.handleSlowRequestComplete) this.handleSlowRequestComplete() ;
			this.errHandlerInternal(err)
		}) ;
	}

	// Empty-body functions
	get(epUrl, opts = {}) {
		return this.request('get', API_URL + epUrl, null, {}, opts);
	}
	delete(epUrl, opts = {}) {
		return this.request('delete', API_URL + epUrl, null, {}, opts);
	}

	// JSON functions
	post(epUrl, data = null, opts = {}) {
		return this.request('post', API_URL + epUrl, data, CONTENT_JSON, opts);
	}
	put(epUrl, data = null, opts = {}) {
		return this.request('put', API_URL + epUrl, data, CONTENT_JSON, opts);
	}
	patch(epUrl, data = null, opts = {}) {
		return this.request('patch', API_URL + epUrl, data, CONTENT_JSON, opts);
	}
}