import NetService from "./netService";

const EP_CONTACT_REQUESTS = 'contactrequests';

export default class ContactRequestService extends NetService {
	create(destUserId) {
		return this.put(EP_CONTACT_REQUESTS + '/' + destUserId) ;
	}
}