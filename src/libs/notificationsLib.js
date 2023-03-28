import { getFullUrl } from "../utils/image";
import ContactService from "../services/contactService";

export class NotificationsLib {
	constructor(viewCommonNet) {
		this.contactService = new ContactService(viewCommonNet) ;
	}

	formatNotificationData(data, removeNotificationCallback) {
		const dataForType = data.dataForType ;
		const id = data.type +':' + data.idForType ;
		switch (data.type) {
			case 'message':
				return {
					id,
					imageUrl: getFullUrl(dataForType.sourceImageUrl) ?? "images/user.png",
					imageLink: `showprofile/${dataForType.sourceUserName}`,
					title: `Message from ${dataForType.sourceUserName}`,
					msgMain: dataForType.subject,
					msgMainLink: `showmessage/${dataForType.idForType}`,
					msgSub: dataForType.msgSummary,
				} ;
			case 'contact_request':
				return {
					id,
					imageUrl: getFullUrl(dataForType.sourceImageUrl) ?? "images/user.png",
					imageLink: `showprofile/${ data.idForType}`,
					title: `Contact request from ${data.idForType}`,
					acceptCallback: () => this.contactService.acceptRequest(data.idForType).then(() => removeNotificationCallback(id)),
					dismissCallback: () => this.contactService.dismissRequest(data.idForType).then(() => removeNotificationCallback(id))
				} ;
			default:
				console.error("Unknown notification type") ;
		}
	}

	removeById(notifications, searchId) {
		return notifications.filter(notification => searchId !== notification.type + ':' + notification.idForType) ;
	}
}