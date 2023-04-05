// CSS
import './css/userRegister.scss';
import logo from '../components/Images/logo.png'

// React and other packages
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Network services
import UserService from "../services/userService";

// React-bootstrap components
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

// Utils and Libraries
import StatusLib from "../libs/statusLib";

// ==============================================================================

export default function UserRegister(viewCommon) {
	const userService = new UserService(viewCommon.net);
	const navigate = useNavigate();

	useEffect(() => {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}, [])

	// Minimum password length
	const pwdMinLength = 8;

	// Form fields
	const [formValues, changeFormValues] = useState({
		email: "",
		password: "",
		password_confirm: "",
	});

	// === STATUS HANDLING ===
	// Error-status for fields
	const [errorStatusList, changeErrorStatusList] = useState({
		email: '',
		password: ''
	});
	// Success status
	const [successMsg, changeSuccessMsg] = useState(null);
	// Status library
	const statusLib = new StatusLib(errorStatusList, changeErrorStatusList, successMsg, changeSuccessMsg) ;

	// Handle form field user-input
	const handleChange = (event) => {
		const newFormValues = { ...formValues };
		const fieldName = event.target.name;
		const newValue = event.target.value;
		newFormValues[fieldName] = newValue;

		if (fieldName === 'email') {
			if (newValue === '') statusLib.setErrorStatus('email', 'Email address required');
			else if (!/[^\s]*@[a-z0-9.-]+/i.test(newValue)) { // (very permissive so we hopefully don't reject valid ones)
				 statusLib.setErrorStatus('email', 'Invalid email address');
			}
			else  statusLib.removeErrorStatus('email');
		}
		else if (['password', 'password_confirm'].includes(fieldName)) {
			if (newFormValues.password.length < 8) statusLib.setErrorStatus('password', 'Password too short');
			else if (newFormValues.password !== newFormValues.password_confirm) statusLib.setErrorStatus('password', 'Password mismatch');
			else statusLib.removeErrorStatus('password');
		}
		changeFormValues(newFormValues);
	}

	// Handle form submission
	const submitHandler = (event) => {
		event.preventDefault();
		const regData = { ...formValues };
		delete regData.password_confirm;
		userService.register(regData).then(() => {
			statusLib.changeSuccessMsg('Registration successful - please wait to be redirected to the login page');
			setTimeout(() => navigate("/login"), 3000);
		}).catch((err) => console.log(err));
	}

	// Template
	return (
		<div className="page-user-register">
			<h1>Create Account</h1>
			{statusLib.getStatusMessageHtml()}

			<Form id="form" className='register-form' onSubmit={(event) => submitHandler(event)}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						name="email"
						onChange={(event) => handleChange(event)}
						disabled={successMsg}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password (min {pwdMinLength} characters)</Form.Label>
					<Form.Control
						name="password"
						type="password"
						onChange={(event) => handleChange(event)}
						disabled={successMsg}
					/>
				</Form.Group>
				<Form.Group controlId="password_confirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						name="password_confirm"
						type="password"
						onChange={(event) => handleChange(event)}
						disabled={successMsg}
					/>
				</Form.Group>

				<div className="button text-center my-4">
					<Button className='orange-button' variant="primary" type="submit"
						disabled={statusLib.isError() || statusLib.getSuccessMsg()}>
						Register
					</Button>
				</div>
			</Form>
			<img className='logo-login' src={logo} alt='logo' />
		</div>
	);
}