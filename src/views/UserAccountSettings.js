// CSS
import './css/UserAccountSettings.css' ;

// React and other packages
import { useState } from 'react';

// Network services
import UserService from "../services/userService";

// React-bootstrap components
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

// Utils
import * as utils from "../utils/utils";

// ==============================================================================

export default function UserAccountSettings({viewCommon, logout}) {
	const userService = new UserService(viewCommon.net);

	// Minimum password length
	const pwdMinLength = 8 ;

	// Form fields
	const [formValues, changeFormValues] = useState({
		password: "",
		newPassword: "",
		newPassword_Confirm: "",
		passwordForDeletion: ""
	}) ;

	// === STATUS HANDLING ===
	// Error-status for fields
	const [errorStatusList, changeErrorStatusList] = useState({
		newPassword: "",
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

		if (['newPassword', 'newPassword_Confirm'].includes(fieldName)) {
			if (newFormValues.newPassword.length < 8) setErrorStatus('newPassword', 'Password too short') ;
			else if (newFormValues.newPassword !== newFormValues.newPassword_Confirm) setErrorStatus('newPassword', 'Password mismatch') ;
			else removeErrorStatus('newPassword') ;
		}
		changeFormValues(newFormValues) ;
  }

	// Handle form submission
  const submitHandlerPwdChange = (event) => {
    event.preventDefault();
    userService.changePwd(formValues.password, formValues.newPassword).then(() => {
			changeSuccessMsg('Password updated') ;
		}).catch((err) => console.log(err)) ;
  }

	const submitHandlerDelAcc = (event) => {
		event.preventDefault();
		userService.deleteAccount(formValues.passwordForDeletion).then(() => {
			logout() ;
		}).catch((err) => console.log(err)) ;
	}

	// Template
  return (
		<div className="user-account-settings">
			<h1>Account Settings</h1>
			{/* {getErrorMessageHtml()} */}
			{getSuccessMessageHtml()}

			<div className="d-flex flex-column gap-4">
				<Form onSubmit={(event) => submitHandlerPwdChange(event)}>
					<fieldset className="d-flex flex-column gap-2 border p-3">
						<legend className="float-none w-auto">Change Password</legend>

						<Form.Group controlId="password">
							<Form.Label>Current Password</Form.Label>
							<Form.Control
								name="password"
								type="password"
								onChange={(event)=>handleChange(event)}
							/>
						</Form.Group>
						<Form.Group controlId="newPassword">
							<Form.Label>New Password (min {pwdMinLength} characters)</Form.Label>
							<Form.Control
								name="newPassword"
								type="password"
								onChange={(event)=>handleChange(event)}
							/>
						</Form.Group>
						<Form.Group controlId="newPassword_Confirm">
							<Form.Label>Confirm New Password</Form.Label>
							<Form.Control
								name="newPassword_Confirm"
								type="password"
								onChange={(event)=>handleChange(event)}
							/>
						</Form.Group>
						
						<Button variant="primary" type="submit" className='mx-auto my-4' disabled={isError()}>Update Password</Button>

					</fieldset>
				</Form>

				<Form onSubmit={(event) => submitHandlerDelAcc(event)}>
					<fieldset className="d-flex flex-column gap-2 border p-3">
						<legend className="float-none w-auto">Account Deletion</legend>

						<Form.Group controlId="password">
							<Form.Label>Enter Your Password To Confirm</Form.Label>
							<Form.Control
								name="passwordForDeletion"
								type="password"
								onChange={(event)=>handleChange(event)}
							/>
						</Form.Group>

						<Button variant="danger" type="submit" className='mx-auto w-50 mb-4' disabled={!formValues.passwordForDeletion}>Delete Your Account</Button>

					</fieldset>
				</Form>
			</div>
		</div>
  );
}