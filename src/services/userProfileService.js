import NetService from "./netService";

const EP_PROFILE = 'profile' ;

export default class UserProfileService extends NetService {
	updateFieldValue(fieldName, value) {
		return this.patch(EP_PROFILE + '/' + fieldName, {value}) ;
	}
}