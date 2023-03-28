import NetService from "./netService";

const EP_CONTACT_REQUESTS = 'contactrequests';
const EP_CONTACT_REQUESTS_SELF = 'contactrequests/self';

export default class ContactService extends NetService {
	createRequest(destUserId) {
		return this.put(EP_CONTACT_REQUESTS + '/' + destUserId) ;
	}

	acceptRequest(userName) {
		return this.post(EP_CONTACT_REQUESTS_SELF + '/' + userName) ;
	}

	dismissRequest(userName) {
		return this.delete(EP_CONTACT_REQUESTS_SELF + '/' + userName) ;
	}
}