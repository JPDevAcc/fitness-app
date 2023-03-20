import NetService from "./netService";

const EP_PROFILE = 'profile' ;

export default class UserProfileService extends NetService {
	retrieve() {
		return this.get(EP_PROFILE) ;
	}

	updateFieldValue(fieldName, value) {
		return this.patch(EP_PROFILE + '/' + fieldName, {value}) ;
	}
}