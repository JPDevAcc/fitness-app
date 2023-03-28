// CSS
import "./css/Dashboard.scss"

// React and other packages
import React, { useState, useEffect } from "react"

// Our components
import NotificationCard from "../components/notificationCard" ;

// Utils
import { NotificationsLib } from "../libs/notificationsLib";

// Contexts (global data)
import { UserContext } from "../contexts/User"

import ContactService from "../services/contactService"; // TEMP: FOR TESTING CONTACT-REQUEST NOTIFICATIONS

// ==============================================================================

export default function Dashboard({viewCommon}) {
	const contactService = new ContactService(viewCommon.net); // TEMP: FOR TESTING CONTACT-REQUEST NOTIFICATIONS

	const [ userDataState, userDataDispatch ] = React.useContext(UserContext) ;
	const notifications = userDataState.notifications ;
	const [formattedNotifications, changeFormattedNotifications] = useState([]) ;

	const notificationsLib = new NotificationsLib(viewCommon.net) ;

	useEffect(() => {
		console.log("NOTIFICATIONS: ", notifications) ;
		const newFormattedNotifications = (notifications || [])
			.map(notification => notificationsLib.formatNotificationData(notification, removeNotificationCallback)) ;
		changeFormattedNotifications(newFormattedNotifications) ;
	}, [notifications]) ;

	function removeNotificationCallback(id) {
		const newNotificationsData = notificationsLib.removeById(notifications, id) ;
		userDataDispatch({ type: "setNotifications", data: newNotificationsData });
	}

	return (
		<>
			<button onClick={() => contactService.createRequest(userDataState.profile.userName)}>TEST: SEND A CONTACT REQUEST TO '{userDataState.profile.userName}'</button>

			<div className="page-dashboard">
				<h1>Dashboard</h1>
				<div className="my-notifications">
				{
					formattedNotifications.map((formattedNotification) =>
						<NotificationCard key={formattedNotification.id} data={formattedNotification} />)
				}
				</div> 
			</div>
		</>
  )
}