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

// ==============================================================================

export default function Dashboard() {
	const [ userState, dispatch ] = React.useContext(UserContext) ;
	const notifications = userState.notifications ;
	const [formattedNotifications, changeFormattedNotifications] = useState([]) ;

	useEffect(() => {
		console.log("NOTIFICATIONS: ", notifications) ;
		const newFormattedNotifications = (notifications || []).map(notification => NotificationsLib.formatNotificationData(notification)) ;
		changeFormattedNotifications(newFormattedNotifications) ;
	}, [notifications]) ;

	return (
		<div className="page-dashboard">
			<h1>Dashboard</h1>
			<div className="my-notifications">
			{
				formattedNotifications.map((formattedNotification) => <Notification key={formattedNotification.id} data={formattedNotification} />)
			}
			</div> 
		</div>
  )
}