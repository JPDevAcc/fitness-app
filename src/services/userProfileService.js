import NetService from "./netService";

const EP_PROFILE = 'profile' ;
const EP_PROFILE_IMAGE = EP_PROFILE + '/image' ;

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
}