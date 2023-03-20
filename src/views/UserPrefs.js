// CSS
import './css/UserPrefs.css' ;

// React and other packages
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// React-bootstrap components
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Network services
import UserPrefsService from "../services/userPrefsService";

// Our components
import Select from '../components/select';

// Utils
import * as utils from "../utils/utils";
import { weightUnitOpts, heightUnitOpts, distanceUnitOpts, temperatureUnitOpts } from '../utils/units';

// Contexts (global data)
import { UserContext } from "../contexts/User"

// ==============================================================================

export const defaults = {
	weightUnits: "kg",
	heightUnits: "m",
	distanceUnits: "miles",
	temperatureUnits: "Celsius",
} ;

export default function UserSitePrefs({data, nextPage = '/', viewCommon}) {
	const userPrefsService = new UserPrefsService(viewCommon.net);
	const navigate = useNavigate();

	// Form fields
	const [ userState, dispatch ] = React.useContext(UserContext) ;
	const formValues = userState.prefs ;

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
		const fieldName = event.target.name ;
		const newValue = event.target.value;
		newFormValues[fieldName] = newValue;
		dispatch({type: 'setPrefs', data: newFormValues});

		userPrefsService.updateFieldValue(fieldName, newValue) ;
  }

	// Handle form submission
  const handleNextPageClick = (event) => {
    event.preventDefault() ;
		userPrefsService.updateFieldValue('onboardingStageComplete', true) ;
		navigate(nextPage) ;
  }

	// Template
  return (
		<div className="user-prefs">
			<h1>Site Preferences</h1>

			<Form className="d-flex flex-column gap-3">
				<Row className="gap-3">
					<Col sm>
						<Form.Label htmlFor="weightUnits">Weight Units</Form.Label>
						<Select id='weightUnits' opts={weightUnitOpts}
							value={formValues.weightUnits} onChange={(event)=>handleChange(event)}
							disabled={successMsg} />
					</Col>
					<Col sm>
						<Form.Label htmlFor="heightUnits">Height Units</Form.Label>
						<Select id='heightUnits'opts={heightUnitOpts}
							value={formValues.heightUnits} onChange={(event)=>handleChange(event)}
							disabled={successMsg} />
					</Col>
				</Row>
				<Row className="gap-3">
					<Col sm>
						<Form.Label htmlFor="distanceUnits">Distance Units</Form.Label>
						<Select id='distanceUnits'opts={distanceUnitOpts}
							value={formValues.distanceUnits} onChange={(event)=>handleChange(event)}
							disabled={successMsg} />
					</Col>
					<Col sm>
						<Form.Label htmlFor="temperatureUnits">Temperature Units</Form.Label>
						<Select id='temperatureUnits' opts={temperatureUnitOpts}
							value={formValues.temperatureUnits} onChange={(event)=>handleChange(event)}
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