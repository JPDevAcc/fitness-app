import NetService from "./netService";

const EP_NOTIFICATIONS = 'notifications';

export default class NotificationsService extends NetService {
	retrieve() {
		return this.get(EP_NOTIFICATIONS) ;
	}
}