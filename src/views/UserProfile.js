// TODO: Privacy toggles
// TODO: Update profile image with server response for URL

import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import * as utils from "../utils/utils";
import UserProfileService from "../services/userProfile";
import ImageUpload from '../components/imageUpload';
import './css/userProfile.css' ;
import Select from '../components/select';
import InputWithSelect from '../components/inputWithSelect';
import { weightUnitOpts, heightUnitOpts, convertWeight, convertHeight } from '../utils/units';
import { UserContext } from "../contexts/User"

export const defaults = {
	imageUrl: "",
	bio: "",
	age: "",
	weight: "",
	weightUnits: "kg",
	height: "",
	heightUnits: "m",
	dietPractice: "",
	dietType: "",
} ;

export default function UserProfile({nextPage = '/', viewCommon}) {
	const userProfileService = new UserProfileService(viewCommon.net);
	const navigate = useNavigate();

	// Form fields
	const [ userState, dispatch ] = React.useContext(UserContext) ;
	const formValues = userState.profile ;

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

	// Handle form field user-input
  const handleChange = (event) => {
		const newFormValues = {...formValues} ;
		let fieldName = event.target.name ;
		let newValue = event.target.value;
		newFormValues[fieldName] = newValue;
		dispatch({type: 'setProfile', data: newFormValues});

		if (fieldName === 'weight' || fieldName === 'weightUnits') {
			newValue = convertWeight(("" + newFormValues['weight']).split(' '), newFormValues['weightUnits'], 'kg')[0] ;
			fieldName = 'weight' ;
		}
		else if (fieldName === 'height' || fieldName === 'heightUnits') {
			newValue = convertHeight(("" + newFormValues['height']).split(' '), newFormValues['heightUnits'], 'm')[0] ;
			fieldName = 'height' ;
		}

		console.log(fieldName, newValue) ;
		userProfileService.updateFieldValue(fieldName, newValue) ;
  }

	// Handle form submission
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
				userProfileService.uploadImage(e.target.result) ;
			};
		}
	} ;

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
			{getErrorMessageHtml()}
			{getSuccessMessageHtml()}

			<Form>
				<div className="image-upload-container-outer mb-4">
					<div className="text-center fw-bold mb-1">Profile Image</div>
					<div className="profile-image">
						<img src={formValues.imageUrl} alt="Profile" />
					</div>
					<div className="image-upload-container-inner d-flex justify-content-center">
						<ImageUpload handleFileUpload={handleFileUpload} />
					</div>
				</div>

				<Form.Group className="mb-4" controlId="bio">
					<Form.Label>Bio</Form.Label>
					<Form.Control
						name="bio"
						as="textarea"
						value={formValues.bio}
						onChange={(event)=>handleChange(event)}
						disabled={successMsg}   
					/>
				</Form.Group>

				<Row className="mb-4">
					<Col md>
						<Select id='age' labelText='Age' opts={ageOpts}
							value={formValues.age}
							onChange={(event)=>handleChange(event)}
							disabled={successMsg} />
					</Col>

					<Col md>
						<InputWithSelect labelText="Weight" 
							inputId="weight" inputValue={formValues.weight} inputOnChange={handleChange} 
							selectId="weightUnits" selectValue={formValues.weightUnits} selectOnChange={handleChange}
							disabled={successMsg} opts={weightUnitOpts} />
					</Col>

					<Col md>
						<InputWithSelect labelText="Height" 
							inputId="height" inputValue={formValues.height} inputOnChange={handleChange} 
							selectId="heightUnits" selectValue={formValues.heightUnits} selectOnChange={handleChange}
							disabled={successMsg} opts={heightUnitOpts} />
					</Col>
				</Row>

				<Row className="mb-4">
					<Col sm>
						<Select id='dietPractice' labelText='Dietary Practice' opts={dietPracticeOpts}
							value={formValues.dietPractice}
							onChange={(event)=>handleChange(event)}
							disabled={successMsg} />
					</Col>
					<Col sm>
						<Select id='dietType' labelText='Diet Type' opts={dietTypeOpts}
							value={formValues.dietType}
							onChange={(event)=>handleChange(event)}
							disabled={successMsg} />
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