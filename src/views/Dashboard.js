// CSS
import "./css/Dashboard.scss"

// React and other packages
import React, { useState, useEffect } from "react"

// Our components
import Notification from "../components/notification" ;

// Utils
import { NotificationsLib } from "../libs/notificationsLib";

// Contexts (global data)
import { UserContext } from "../contexts/User"

import ContactRequestService from "../services/contactRequestService"; // TEMP: FOR TESTING CONTACT-REQUEST NOTIFICATIONS

// ==============================================================================

export default function Dashboard({viewCommon}) {
	const contactRequestService = new ContactRequestService(viewCommon.net); // TEMP: FOR TESTING CONTACT-REQUEST NOTIFICATIONS

	const [ userDataState, userDataDispatch ] = React.useContext(UserContext) ;
	const notifications = userDataState.notifications ;
	const [formattedNotifications, changeFormattedNotifications] = useState([]) ;

	useEffect(() => {
		console.log("NOTIFICATIONS: ", notifications) ;
		const newFormattedNotifications = (notifications || []).map(notification => NotificationsLib.formatNotificationData(notification)) ; ///
		changeFormattedNotifications(newFormattedNotifications) ;
	}, [notifications]) ;

	return (
		<>
			<button onClick={() => contactRequestService.create('User_07b0bc34')}>TEST: SEND A CONTACT REQUEST TO 'User_07b0bc34' (NT@NT)</button>

			<div className="page-dashboard">
				<h1>Dashboard</h1>
				<div className="my-notifications">
				{
					formattedNotifications.map((formattedNotification) => <Notification key={formattedNotification.id} data={formattedNotification} />)
				}
				</div> 
			</div>
		</>
  )
}