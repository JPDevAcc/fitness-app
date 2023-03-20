import NetService from "./netService";

const EP_PREFS = 'prefs' ;

export default class UserPrefsService extends NetService {
	retrieve() {
		return this.get(EP_PREFS) ;
	}

	updateFieldValue(fieldName, value) {
		return this.patch(EP_PREFS + '/' + fieldName, {value}) ;
	}
}