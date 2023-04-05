import NetService from "../netService";

const EP_PROFILE = 'profile' ;
const EP_PROFILE_IMAGE = EP_PROFILE + '/image' ;
const EP_PROFILE_USERNAME = EP_PROFILE + '/userName' ;

export default class UserProfileService extends NetService {
	updateFieldValue(fieldName, value) {
		return this.patch(EP_PROFILE + '/' + fieldName, {value}) ;
	}

	updateImage(category, dataBlob) {
		return this.post(EP_PROFILE_IMAGE + '/' + category, { dataBlob }) ;
	}

	removeImage(category) {
		return this.delete(EP_PROFILE_IMAGE + '/' + category) ;
	}

	changeUserName(currentPassword, newUserName) {
		return this.post(EP_PROFILE_USERNAME, { currentPassword, newUserName }) ;
	}

	getProfile(userName) { 
    return this.get(EP_PROFILE + '/' + userName);
	}
}