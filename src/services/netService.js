import axios from "axios";

const CONTENT_JSON_HEADER = {
	headers: {
		'content-type': 'application/json'
	}
} ;

const API_URL = process.env.REACT_APP_API_URL ;

export default class NetService {
	constructor(errHandler) {
		this.errHandler = errHandler ;
	}

	errHandlerInternal(err) {
		if (this.errHandler) this.errHandler(err.message) ;
		else console.error(err) ;
		throw(err) ; // (rethrow)
	}

	errClearInternal() {
		if (this.errHandler) this.errHandler(null) ;
	}

	get(epUrl) {
		return axios.get(API_URL + epUrl).then(() => this.errClearInternal()).catch((err) => this.errHandlerInternal(err)) ;
	}
	delete(epUrl) {
		return axios.delete(API_URL + epUrl).then(() => this.errClearInternal()).catch((err) => this.errHandlerInternal(err)) ;
	}
	post(epUrl, data) {
		console.log(API_URL, epUrl) ;
		return axios.post(API_URL + epUrl, data, CONTENT_JSON_HEADER).then(() => this.errClearInternal()).catch((err) => this.errHandlerInternal(err)) ;
	}
	put(epUrl, data) {
		return axios.put(API_URL + epUrl, data, CONTENT_JSON_HEADER).then(() => this.errClearInternal()).catch((err) => this.errHandlerInternal(err)) ;
	}
	patch(epUrl, data) {
		return axios.patch(API_URL + epUrl, data, CONTENT_JSON_HEADER).then(() => this.errClearInternal()).catch((err) => this.errHandlerInternal(err)) ;
	}
}