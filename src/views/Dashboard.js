// CSS
import "./css/Dashboard.scss"

// React and other packages
import React, { useState, useEffect } from "react"

// Network services
import UserProfileService from "../services/userProfileService";

// Our components
import NotificationCard from "../components/notificationCard" ;
import BMICard from "../components/bmiCalcCard";

// Utils
import { NotificationsLib } from "../libs/notificationsLib";

// Contexts (global data)
import { UserContext } from "../contexts/User"

// ==============================================================================

export default function Dashboard({viewCommon}) {
	// State
	const [ userDataState, userDataDispatch ] = React.useContext(UserContext) ;
	const {prefs, profile} = userDataState ;
	const notifications = userDataState.notifications ;
	const [formattedNotifications, changeFormattedNotifications] = useState([]) ;

	// Services and libraries
	const userProfileService = new UserProfileService(viewCommon.net) ;
	const notificationsLib = new NotificationsLib(viewCommon.net) ;

	// Handle notifications update
	useEffect(() => {
		const newFormattedNotifications = (notifications || [])
			.map(notification => notificationsLib.formatNotificationData(notification, removeNotificationCallback)) ;
		changeFormattedNotifications(newFormattedNotifications) ;
	}, [notifications]) ;

	function removeNotificationCallback(id) {
		const newNotificationsData = notificationsLib.removeById(notifications, id) ;
		userDataDispatch({ type: "setNotifications", data: newNotificationsData });
	}

	function handleRecordWeightAndHeight(weight, height) {
		const newProfileValues = {...profile, height, weight} ;
		userDataDispatch({type: 'setProfile', data: newProfileValues}) ;

		// Update weight and height in database
		// (TODO: Ideally this should be an atomic operation to ensure data-consistency so maybe add a multi-field-update endpoint for this later)
		userProfileService.updateFieldValue('height', height) ;
		userProfileService.updateFieldValue('weight', weight) ;
	}

	return (
		<div className="page-dashboard">
			<h1>Dashboard</h1>
			<div className="my-notifications">
				<h2>Notifications</h2>
			{
				formattedNotifications.map((formattedNotification) =>
					<NotificationCard key={formattedNotification.id} data={formattedNotification} />)
			}
			</div>
			<div className="my-tools">
				<h2>Tools</h2>
				<BMICard
					handleRecordWeightAndHeight={handleRecordWeightAndHeight}
					heightMetric={profile.height}
					weightMetric={profile.weight}
					heightUnits={prefs.heightUnits}
					weightUnits={prefs.weightUnits}
				/>
			</div>
		</div>
  )
}