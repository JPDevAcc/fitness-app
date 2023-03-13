// Adapted from "Social Cards" Project

import {useState} from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import * as utils from "../utils/utils";

export default function UserRegister({userService}) {
	const navigate = useNavigate();

	// Minimum password length
	const pwdMinLength = 8 ;

	// Form fields
	const [formValues, changeFormValues] = useState({
		email: "",
		password: "",
		password_confirm: "",
		imageUrl: "",
		bio: ""
	}) ;

	// === STATUS HANDLING ===
	// Error-status for fields
	const [errorStatusList, changeErrorStatusList] = useState({
		email: '',
		password: ''
	}) ;
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
		const fieldName = event.target.name ;
		const newValue = event.target.value;
		newFormValues[fieldName] = newValue;

		if (fieldName === 'email') {
			if (newValue === '') setErrorStatus('email', 'Email address required') ;
			else removeErrorStatus('email') ;
		}
		else if (['password', 'password_confirm'].includes(fieldName)) {
			if (newFormValues.password.length < 8) setErrorStatus('password', 'Password too short') ;
			else if (newFormValues.password !== newFormValues.password_confirm) setErrorStatus('password', 'Password mismatch') ;
			else removeErrorStatus('password') ;
		}
		changeFormValues(newFormValues) ;
  }

	// Handle form submission
  const submitHandler = (event) => {
    event.preventDefault();
		const regData = {...formValues} ;
		delete regData.password_confirm ;
    userService.register(regData).then(() => {
			changeSuccessMsg('Registration successful - please wait to be redirected to the login page') ;
			setTimeout(() => navigate("/"), 3000);
		}).catch((err) => console.log(err)) ;
  }

	// Template
  return (
		<div className="user-register">
			<h1>Create Account</h1>
			{getErrorMessageHtml()}
			{getSuccessMessageHtml()}

			<Form onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control className='omg'
						name="email"
						onChange={(event)=>handleChange(event)}
						disabled={successMsg}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password (min {pwdMinLength} characters)</Form.Label>
					<Form.Control className='omg'
						name="password"
						type="password"
						onChange={(event)=>handleChange(event)}  
						disabled={successMsg}  
					/>
				</Form.Group>
				<Form.Group controlId="password_confirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control className='omg'
						name="password_confirm"
						type="password"
						onChange={(event)=>handleChange(event)}
						disabled={successMsg}  
					/>
				</Form.Group>
				<Form.Group controlId="imageUrl">
					<Form.Label>Profile Image URL</Form.Label>
					<Form.Control className='omg'
						name="imageUrl"
						onChange={(event)=>handleChange(event)}
						disabled={successMsg}  
					/>
				</Form.Group>
				<Form.Group controlId="bio">
					<Form.Label>Bio</Form.Label>
					<Form.Control className='omg'
						name="bio"
						as="textarea"
						onChange={(event)=>handleChange(event)}
						disabled={successMsg}   
					/>
				</Form.Group>
				
				<div className="text-center my-4">
					<Button variant="primary" type="submit" disabled={isError() || successMsg}>Register</Button>
				</div>
			</Form>
		</div>
  );
}