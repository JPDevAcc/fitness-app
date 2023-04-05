// CSS
import './css/userPrefs.scss' ;

// React and other packages
import React from 'react';
import { useNavigate } from "react-router-dom";

// React-bootstrap components
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Network services
import UserPrefsService from "../services/userPrefsService";

// Our components
import Select from '../components/Select';

// Utils and Libraries
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

export default function UserSitePrefs({nextPage, viewCommon}) {
	const userPrefsService = new UserPrefsService(viewCommon.net);
	const navigate = useNavigate();

	// Form fields
	const [ userState, dispatch ] = React.useContext(UserContext) ;
	const formValues = userState.prefs ;

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
		<div className="page-user-prefs">
			<h1>Site Preferences</h1>

			<Form className="user-prefs d-flex flex-column gap-3">
				<Row className="gap-3">
					<Col sm>
						<Form.Label htmlFor="weightUnits">Weight Units</Form.Label>
						<Select id='weightUnits' opts={weightUnitOpts}
							value={formValues.weightUnits} onChange={(event)=>handleChange(event)}
						/>
					</Col>
					<Col sm>
						<Form.Label htmlFor="heightUnits">Height Units</Form.Label>
						<Select id='heightUnits'opts={heightUnitOpts}
							value={formValues.heightUnits} onChange={(event)=>handleChange(event)}
						 />
					</Col>
				</Row>
				<Row className="gap-3">
					<Col sm>
						<Form.Label htmlFor="distanceUnits">Distance Units</Form.Label>
						<Select id='distanceUnits'opts={distanceUnitOpts}
							value={formValues.distanceUnits} onChange={(event)=>handleChange(event)}
						/>
					</Col>
					<Col sm>
						<Form.Label htmlFor="temperatureUnits">Temperature Units</Form.Label>
						<Select id='temperatureUnits' opts={temperatureUnitOpts}
							value={formValues.temperatureUnits} onChange={(event)=>handleChange(event)}
						/>
					</Col>
				</Row>
				
			{nextPage &&
				<div className="text-center my-4">
					<Button onClick={handleNextPageClick} variant="primary" type="submit">Next</Button>
				</div>}
			</Form>
		</div>
  );
}