import NetService from "./netService";

const EP_USERVALUEHISTORY = 'userValueHistory';
const EP_USERVALUEHISTORY_FIRSTVALFORFIELD = EP_USERVALUEHISTORY + '/getFirstValueForField' ;

export default class UserValuesHistory extends NetService {
	retrieveFirstValForField(fieldName) {
		return this.get(EP_USERVALUEHISTORY_FIRSTVALFORFIELD + '/' + fieldName) ;
	}
}