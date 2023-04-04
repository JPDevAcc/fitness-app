import NetService from "../netService";

const EP_USERDATA = 'userdata' ;

export default class UserDataService extends NetService {
	retrieve() {
		return this.get(EP_USERDATA) ;
	}
}