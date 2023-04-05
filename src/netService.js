import axios from "axios";

const CONTENT_JSON = {
	'content-type': 'application/json'
};

const API_URL = process.env.REACT_APP_API_URL;

export default class NetService {
	constructor({ errHandler = null, tokenProvider = null, logoutHandler = null } = {}) {
		this.errHandler = errHandler;
		this.tokenProvider = tokenProvider;
		this.logoutHandler = logoutHandler;

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
		let headers = {}
		if (this.tokenProvider) headers.token = this.tokenProvider() ;
		headers = {...headers, ...extraHeaders} ;
		if (data === null) delete headers['content-type'] ; // (don't set content-type if no data)
		const axiosData = (data === null) ? {method, url, headers} : {method, url, data, headers} ;
		return axios(axiosData).then((response) => {
			if (!opts.noErrorClear) this.errClearInternal() ;
			return response ;
		}).catch((err) => this.errHandlerInternal(err)) ;
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