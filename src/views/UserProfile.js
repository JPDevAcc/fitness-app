// CSS
import './css/UserProfile.scss' ;

// React and other packages
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";

// React-bootstrap components
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Network services
import UserProfileService from "../services/userProfileService";

// Our components
import ProfileImageUpload from '../components/profileImageUpload';
import Select from '../components/select';
import UnitsInput from '../components/unitsInput';
import PrivacyButtons from '../components/privacyButtons';
import GoalsSelection from '../components/goalsSelection';

// Utils
import * as utils from "../utils/utils";
import { weightUnitOpts, heightUnitOpts, convertWeight, convertHeight } from '../utils/units';
import { getFullUrl } from "../utils/image";

// Contexts (global data)
import { UserContext } from "../contexts/User"

// ==============================================================================

export const defaults = {
	imageUrl: "",
	imagePrivacy: "pri",
	bio: "",
	bioPrivacy: "pri",
	age: "",
	agePrivacy: "pri",
	weight: "", // kg
	weightPrivacy: "pri",
	weightDisplayUnits: "kg",
	height: "", // m
	heightPrivacy: "pri",
	heightDisplayUnits: "m",
	dietPractice: "",
	dietPracticePrivacy: 'pri',
	dietType: "",
	dietTypePrivacy: 'pri',
	selectedGoalIds: [],
	selectedGoalIdsPrivacy: 'pri'
} ;

export default function UserProfile({nextPage, viewCommon}) {
	const userProfileService = new UserProfileService(viewCommon.net);
	const navigate = useNavigate();
	let { section } = useParams();

	const sections = ['main', 'goals'] ;
	
	// Get actual next page (subsection or the one given externally)
	let actualNextPage = nextPage ;
	if (actualNextPage) {
		const currentSectionIndex = sections.indexOf(section) ;
		if (sections[currentSectionIndex + 1]) actualNextPage = '/profile/' + sections[currentSectionIndex + 1] ;
	}

	// Form fields
	const [ userState, dispatch ] = React.useContext(UserContext) ;
	const formValues = userState.profile ;
	const prefs = userState.prefs ;

	// === STATUS HANDLING ===
	// Error-status for fields
	const [errorStatusList, changeErrorStatusList] = useState({}) ;

	// Success status
	const [successMsg, changeSuccessMsg] = useState(null) ;

	// Set and remove error-status for the specified category
	function setErrorStatus(category, msg) {
		utils.setErrorStatus(changeErrorStatusList, category, msg) ;
	}
	function removeErrorStatus(category) {
		utils.removeErrorStatus(changeErrorStatusList, category) ;
	}
	// Retrieve active (non-blank) error
	function getError() {
		return utils.getError(errorStatusList) ;
	}
	// Get current HTML error message
	function getErrorMessageHtml() {
		return utils.getMessageHtml(getError()) ;
	}
	// Get current HTML success message
	function getSuccessMessageHtml() {
		return utils.getMessageHtml(successMsg, 'success') ;
	}
	// Returns boolean denoting whether there is currently an error
	function isError() {
		return utils.isError(errorStatusList) ;
	}
	// Returns boolean denoting whether there is currently an error
	function isSpecificError(category) {
		return utils.isSpecificError(errorStatusList, category) ;
	}

	// Handle form field user-input
  const handleChange = (changeData) => {
		let fieldName, newValue ;
		
		if (Array.isArray(changeData)) {
			[fieldName, newValue] = changeData ;
		} else {
			fieldName = changeData.target.name ;
			newValue = changeData.target.value;
		}

		const newFormValues = {...formValues} ;
		newFormValues[fieldName] = newValue;
		dispatch({type: 'setProfile', data: newFormValues});

		console.log(fieldName, newValue) ;
		userProfileService.updateFieldValue(fieldName, newValue) ;
  }

	// Handle next-page action
  const handleNextPageClick = (event) => {
    event.preventDefault() ;
		userProfileService.updateFieldValue('onboardingStageComplete', true) ;
		navigate(actualNextPage) ;
  }

	const handleFileUpload = (file) => {
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				userProfileService.updateImage('profile', e.target.result).then(({data: {url}}) => {
					const newFormValues = {...formValues} ;
					newFormValues.imageUrl = url ;
					dispatch({type: 'setProfile', data: newFormValues});
				}) ;
			};
		}
	} ;

	const handleImageRemove = () => {
		userProfileService.removeImage('profile').then(() => {
			const newFormValues = {...formValues} ;
			newFormValues.imageUrl = "" ;
			dispatch({type: 'setProfile', data: newFormValues});
		}) ;
	}

	const handleAddGoal = (goalId) => {
		const newFormValues = {...formValues} ;
		const newSelectedGoalIds = [...formValues.selectedGoalIds, goalId] ;
		newFormValues.selectedGoalIds = newSelectedGoalIds ;
		dispatch({type: 'setProfile', data: newFormValues}) ;

		userProfileService.updateFieldValue('selectedGoalIds', newSelectedGoalIds) ;
	}

	const handleRemoveGoal = (goalId) => {
		const newFormValues = {...formValues} ;
		const newSelectedGoalIds = formValues.selectedGoalIds.filter(id => id !== goalId) ;
		newFormValues.selectedGoalIds = newSelectedGoalIds ;
		dispatch({type: 'setProfile', data: newFormValues});

		userProfileService.updateFieldValue('selectedGoalIds', newSelectedGoalIds) ;
	}

	const ageOpts = [
		{value: '', displayName: '- Select -'},
		{value: '18-24'}, 
		{value: '25-34'}, {value: '35-44'}, 
		{value: '45-54'}, {value: '55-64'}, 
		{value: '65 or over'}, 
	] ;

	const dietPracticeOpts = [
		{value: '', displayName: '- Select -'},
		{value: 'none', displayName: 'None (mixed diet)'},
		{value: 'vegetarian', displayName: 'Vegetarian'},
		{value: 'vegan', displayName: 'Vegan'},
		{value: 'pescetarian', displayName: 'Pescetarian'},
		{value: 'other', displayName: 'Other'},
	]

	const dietTypeOpts = [
		{value: '', displayName: '- Select -'},
		{value: 'balanced', displayName: 'Normal (balanced diet)'},
		{value: 'low_fat', displayName: 'Low fat'},
		{value: 'low_carbs', displayName: 'Low carbs'},
		{value: 'keto', displayName: 'Keto'},
		{value: 'other', displayName: 'Other'},
	]

	const goalOpts = [
		{value: '', displayName: '- Select -'},
		{value: 'lose_weight', displayName: 'Lose weight'},
		{value: 'make_friends', displayName: 'Make friends'},
		{value: 'get_fit', displayName: 'Get fit'},
		{value: 'build_muscle', displayName: 'Build muscle'},
		{value: 'improve_diet', displayName: 'Improve diet'},
		{value: 'explore', displayName: 'Explore the outdoors'},
	]

	const goalIdsToTitle = {
		lose_weight : 'Lose weight',
		make_friends: 'Make friends',
		get_fit: 'Get fit',
		build_muscle: 'Build muscle',
		improve_diet: 'Improve diet',
		explore:'Explore'
	} ;

	// Template
  return (
		<div className="page-user-profile">
			<h1>User Profile</h1>

			<div className="d-flex justify-content-around">
				<div className="user-profile-tab-link">
					<img onClick={() => navigate('/profile/main')} src="images/bio.webp" alt="bio section" />
					<div className="text-center">Bio</div>
				</div>
				<div className="user-profile-tab-link">
					<img onClick={() => navigate('/profile/goals')} src="images/target.png" alt="goals section" />
					<div className="text-center">Goals</div>
				</div>
			</div>
			
		{(section === 'main') &&
			<Form>
			<fieldset className="user-profile d-flex flex-column gap-3 border p-3">
				<legend className="float-none w-auto">Bio</legend>

				<div className="image-upload-container-outer">
					<ProfileImageUpload image={getFullUrl(formValues.imageUrl)} handleImageUpload={handleFileUpload} handleImageRemove={handleImageRemove} />
					<div className="d-flex justify-content-center">
						<PrivacyButtons id="imagePrivacy" value={formValues.imagePrivacy} onChange={(val) => handleChange(['imagePrivacy', val])} />
					</div>
				</div>

				<Row className="gap-3">
					<Col md>
						<Form.Label htmlFor="bio">About me</Form.Label>
						<PrivacyButtons id="bioPrivacy" value={formValues.bioPrivacy} onChange={(val) => handleChange(['bioPrivacy', val])} />
						<Form.Control
							name="bio"
							as="textarea"
							value={formValues.bio}
							onChange={(event)=>handleChange(event)}
						/>
					</Col>
				</Row>

				<Row className="gap-3">
					<Col md>
						<Form.Label htmlFor="age">Age</Form.Label>
						<PrivacyButtons id="agePrivacy" value={formValues.agePrivacy} onChange={(val) => handleChange(['agePrivacy', val])} />
						<Select id='age' opts={ageOpts}
							value={formValues.age}
							onChange={(event)=>handleChange(event)}
							/>
					</Col>

					<Col md>
						<Form.Label htmlFor="Weight_i1">Weight</Form.Label>
						<PrivacyButtons id="weightPrivacy" value={formValues.weightPrivacy} onChange={(val) => handleChange(['weightPrivacy', val])} />
						<UnitsInput unitType="Weight" unitOpts={weightUnitOpts} metricValue={formValues.weight} setErrorStatus={setErrorStatus}
							currentUnit={prefs.weightUnits} onValueChange = {(metricVal) => handleChange(['weight', metricVal])}
							className={isSpecificError('Weight') ? 'is-invalid' : ''} conversionFunc = {convertWeight} />
					</Col>

					<Col md>
						<Form.Label htmlFor="Height_i1">Height</Form.Label>
						<PrivacyButtons id="heightPrivacy" value={formValues.heightPrivacy} onChange={(val) => handleChange(['heightPrivacy', val])} />
						<UnitsInput unitType="Height" unitOpts={heightUnitOpts} metricValue={formValues.height} setErrorStatus={setErrorStatus}
							currentUnit={prefs.heightUnits} onValueChange = {(metricVal) => handleChange(['height', metricVal])}
							className={isSpecificError('Height') ? 'is-invalid' : ''} conversionFunc = {convertHeight} />
					</Col>
				</Row>

				<Row className="gap-3">
					<Col sm>
						<Form.Label htmlFor="dietPractice">Dietary Practice</Form.Label>
						<PrivacyButtons id="dietPracticePrivacy" value={formValues.dietPracticePrivacy} onChange={(val) => handleChange(['dietPracticePrivacy', val])} />
						<Select id='dietPractice' opts={dietPracticeOpts}
							value={formValues.dietPractice}
							onChange={(event)=>handleChange(event)}
							/>
					</Col>
					<Col sm>
						<Form.Label htmlFor="dietType">Diet Type</Form.Label>
						<PrivacyButtons id="dietTypePrivacy" value={formValues.dietTypePrivacy} onChange={(val) => handleChange(['dietTypePrivacy', val])} />
						<Select id='dietType' opts={dietTypeOpts}
							value={formValues.dietType}
							onChange={(event)=>handleChange(event)}
							/>
					</Col>
				</Row>
				</fieldset>
			</Form>}

		{(section === 'goals') &&
			<fieldset className="user-profile d-flex flex-column gap-2 border p-3">
				<legend className="float-none w-auto">Goals</legend>

				<div className="d-flex justify-content-center">
					<PrivacyButtons id="selectedGoalIdsPrivacy" value={formValues.selectedGoalIdsPrivacy} onChange={(val) => handleChange(['selectedGoalIdsPrivacy', val])} />
				</div>

				<GoalsSelection
					goalOpts={goalOpts}
					selectedGoalIds={formValues.selectedGoalIds}
					goalIdsToTitle={goalIdsToTitle}
					handleAddGoal={handleAddGoal}
					handleRemoveGoal={handleRemoveGoal} />
			</fieldset>}
				
			{actualNextPage &&
				<div className="text-center my-4">
					<Button onClick={handleNextPageClick} variant="primary" type="submit" disabled={isError() || successMsg}>Next</Button>
				</div>}

		</div>
  );
}