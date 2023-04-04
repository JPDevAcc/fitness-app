// CSS
import "./css/_dashboard.scss"

// React and other packages
import React, { useState, useEffect } from "react"

// Network services
import UserProfileService from "../services/userProfileService";
import UserValuesHistoryService from "../services/userValuesHistoryService";

// Our components
import NotificationCard from "../components/_NotificationCard" ;
import TargetProgressCard from "../components/_TargetProgressCard";
import BMICard from "../components/_BmiCalcCard";

// Utils
import { NotificationsLib } from "../libs/notificationsLib";
import { convertBetweenWeightAndBMI, formatUnits, convertWeight, roundValue } from "../utils/units";

// Contexts (global data)
import { UserContext } from "../contexts/User"

// ==============================================================================

export default function Dashboard({viewCommon}) {
	// State
	const [ userDataState, userDataDispatch ] = React.useContext(UserContext) ;
	const {prefs, profile} = userDataState ;
	const notifications = userDataState.notifications ;
	const [formattedNotifications, changeFormattedNotifications] = useState([]) ;
	const [weightTargetData, changeWeightTargetData] = useState(null) ;

	// Services and libraries
	const userProfileService = new UserProfileService(viewCommon.net) ;
	const userValuesHistoryService = new UserValuesHistoryService(viewCommon.net) ;
	const notificationsLib = new NotificationsLib(viewCommon.net) ;

	// Handle notifications update
	useEffect(() => {
		const newFormattedNotifications = (notifications || [])
			.map(notification => notificationsLib.formatNotificationData(notification, removeNotificationCallback)) ;
		changeFormattedNotifications(newFormattedNotifications) ;
	}, [notifications]) ;

	useEffect(() => {
		if (!userDataState.profile.weightGoalValue || !userDataState.profile.selectedGoalIds.includes('lose_weight')) return ;

		getWeightProgressValues() ;
	}, []) ;

	function getWeightProgressValues() {
		const p1 = userValuesHistoryService.retrieveFirstValForField('weight') ;
		const p2 = userValuesHistoryService.retrieveFirstValForField('height') ;
		Promise.all([p1, p2]).then(([{data: initialWeightData}, { data: initialHeightData}]) => {
				const initialWeight = initialWeightData.value ;
				const initialHeight = initialHeightData.value ;
				const currentWeight = userDataState.profile.weight ;
				const currentHeight = userDataState.profile.height ;
				const targetValue = userDataState.profile.weightGoalValue ;
				const weightGoalUnits = userDataState.profile.weightGoalUnits ;
				const weightUnits = userDataState.prefs.weightUnits ;
				
				// Determine initial and current values (weight / bmi / bmiPrime) depending on the units of the target
				const initialValue = convertBetweenWeightAndBMI(initialWeight, 'absolute', weightGoalUnits, initialHeight) ;
				const currentValue = convertBetweenWeightAndBMI(currentWeight, 'absolute', weightGoalUnits, currentHeight) ;
				
				// Calculate progress
				const progressPercent = Math.max(((currentValue - initialValue) / (targetValue - initialValue)), 0) * 100 ;

				// Determine initial and target value strings
				let initialValueString, targetValueString ;

				if (weightGoalUnits === 'absolute') {
					initialValueString = formatUnits(convertWeight([initialValue], 'kg', weightUnits), weightUnits) ;
					targetValueString = formatUnits(convertWeight([targetValue], 'kg', weightUnits), weightUnits) ;
				}
				else if (weightGoalUnits === 'bmi') {
					initialValueString = roundValue(initialValue, 1) + ' BMI' ;
					targetValueString = roundValue(targetValue, 1) + ' BMI' ;
				}
				else {
					initialValueString = roundValue(initialValue, 2) + ' BMI Prime' ;
					targetValueString = roundValue(targetValue, 2) + ' BMI Prime' ;
				}

				changeWeightTargetData({progressPercent, initialValueString, targetValueString}) ;
			}
		) ;
	}

	function removeNotificationCallback(id) {
		const newNotificationsData = notificationsLib.removeById(notifications, id) ;
		userDataDispatch({ type: "setNotifications", data: newNotificationsData });
	}

	function handleRecordWeightAndHeight(weight, height) {
		const newProfileValues = {...profile, height, weight} ;
		userDataDispatch({type: 'setProfile', data: newProfileValues}) ;

		// Update weight and height in database
		// (TODO: Ideally this should be an atomic operation to ensure data-consistency so maybe add a multi-field-update endpoint for this later)
		const p1 = userProfileService.updateFieldValue('height', height) ;
		const p2 = userProfileService.updateFieldValue('weight', weight) ;
		Promise.all([p1, p2]).finally(() => {
			// Update progress indicator (doing a full refresh from the endpoint for the sake of simplicity)
			getWeightProgressValues() ;
		}) ;	
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

		{(weightTargetData) && 
			<div className="my-goals">
				<h2>Goals</h2>
			{(weightTargetData) && 
				<TargetProgressCard
					imageUrl='images/goalTiles/lose_weight.avif'
					title='Weight'
					percent={weightTargetData.progressPercent}
					initial={weightTargetData.initialValueString}
					target={weightTargetData.targetValueString}
				/>}
			</div>}

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