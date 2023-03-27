export class NotificationsLib {
	static formatNotificationData(data) {
		const dataForType = data.dataForType ;
		switch (data.type) {
			case 'message':
				return {
					id: data.type +':' + dataForType.messageId,
					image: dataForType.image ?? "images/user.png",
					imageLink: `showprofile/${dataForType.sourceUserName}`,
					title: `Message from ${dataForType.sourceUserName}`,
					msgMain: dataForType.subject,
					msgMainLink: `showmessage/${dataForType.messageId}`,
					msgSub: dataForType.msgSummary
				} ;
			case 'contact_request':
				return {
					id: data.type + ':' + dataForType.requestId,
					image: dataForType.image ?? "images/user.png",
					imageLink: `showprofile/${dataForType.sourceUserName}`,
					title: `Contact request from ${dataForType.sourceUserName}`,
				} ;
			default:
				console.error("Unknown notification type") ;
		}
	}
}