import NetService from "../netService";

const EP_NOTIFICATIONS = 'notifications';

export default class NotificationsService extends NetService {
	retrieve(isAuto = false) {
		return this.get(EP_NOTIFICATIONS, isAuto ? {noErrorClear: true, noSlowRequestHandling: true} : {}) ;
	}
}