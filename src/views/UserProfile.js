import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import * as utils from "../utils/utils";
import UserProfileService from "../services/userProfile";
import './css/userProfile.css' ;
import Select from '../components/select';
import { weightUnitOpts, heightUnitOpts, convertWeight, convertHeight } from '../utils/units';
import { UserContext } from "../contexts/User";
import UnitsComponent from '../components/unitsComponent';
import ProfileImageUpload from '../components/profileImageUpload';
import PrivacyButtons from '../components/privacyButtons';

export const defaults = {
	image: "",
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
} ;

export default function UserProfile({nextPage = '/', viewCommon}) {
	const userProfileService = new UserProfileService(viewCommon.net);
	const navigate = useNavigate();

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
		navigate(nextPage) ;
  }

	const handleFileUpload = (file) => {
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				userProfileService.updateFieldValue('image', e.target.result).then(() => {
				const newFormValues = {...formValues} ;
				newFormValues.image = e.target.result;
				dispatch({type: 'setProfile', data: newFormValues});
				}) ;
			};
		}
	} ;

	const handleImageRemove = () => {
		const newFormValues = {...formValues} ;
		newFormValues.image = "" ;
		dispatch({type: 'setProfile', data: newFormValues});
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

	// Template
  return (
		<div className="user-profile">
			<h1>User Profile</h1>

			<Form className="d-flex flex-column gap-3">
				<div className="image-upload-container-outer">
					<ProfileImageUpload image={formValues.image} handleImageUpload={handleFileUpload} handleImageRemove={handleImageRemove} />
					<div className="d-flex justify-content-center">
						<PrivacyButtons id="imagePrivacy" value={formValues.imagePrivacy} onChange={(val) => handleChange(['imagePrivacy', val])} />
					</div>
				</div>

				<Row className="gap-3">
					<Col md>
						<Form.Label htmlFor="bio">Bio</Form.Label>
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
						<UnitsComponent unitType="Weight" unitOpts={weightUnitOpts} metricValue={formValues.weight} setErrorStatus={setErrorStatus}
							currentUnit={prefs.weightUnits} onValueChange = {(metricVal) => handleChange(['weight', metricVal])}
							className={isSpecificError('Weight') ? 'is-invalid' : ''} conversionFunc = {convertWeight} />
					</Col>

					<Col md>
						<Form.Label htmlFor="Height_i1">Height</Form.Label>
						<PrivacyButtons id="heightPrivacy" value={formValues.heightPrivacy} onChange={(val) => handleChange(['heightPrivacy', val])} />
						<UnitsComponent unitType="Height" unitOpts={heightUnitOpts} metricValue={formValues.height} setErrorStatus={setErrorStatus}
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
				
			{nextPage &&
				<div className="text-center my-4">
					<Button onClick={handleNextPageClick} variant="primary" type="submit" disabled={isError() || successMsg}>Next</Button>
				</div>}
			</Form>
		</div>
  );
}