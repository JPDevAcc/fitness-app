// Main CSS
import "./css/bmiCalcCard.scss";

// React and other packages
import React, { useState, useEffect } from "react";

// React-bootstrap components
import { Card, Row, Col, Form, Button } from "react-bootstrap";

// Our components
import ButtonsRadio from "./buttonsRadio";
import UnitsInput from "./unitsInput";

// Utils
import { weightUnitOpts, heightUnitOpts, convertWeight, convertHeight, calcBMIValues } from '../utils/units';
import * as utils from "../utils/utils.js" ;

// ==============================================================================

// - Tables -
const bmiPrimeAndClassTable = [
	[0.00, 'Underweight'],
	[0.74, 'Normal Weight'],
	[1.00, 'Overweight'],
	[1.20, 'Obese (class 1)'],
	[1.40, 'Obese (class 2)'],
	[1.60, 'Obese (class 3)']
 ] ;

const bmiClassToCSSClass = {
	null : '',
	'Underweight': 'bmi-underweight',
	'Normal Weight': 'bmi-normal',
	'Overweight': 'bmi-overweight',
	'Obese (class 1)': 'bmi-obese1',
	'Obese (class 2)': 'bmi-obese2',
	'Obese (class 3)': 'bmi-obese3'
} ;

// ==============================================================================

export default function BMICard({weightMetric, heightMetric, weightUnits, heightUnits, handleRecordWeightAndHeight}) {
	// === STATUS HANDLING ===
	// Error-status for fields
	const [errorStatusList, changeErrorStatusList] = useState({}) ;

	// State
	const [formValues, changeFormValues] = useState({
		weightMetric: weightMetric ?? "",
		heightMetric: heightMetric ?? "",
		lockSetting: heightMetric ? 'Locked height' : 'Unlocked height' // (initially locked if specified in profile)
	}) ;
	const [bmiValues, changeBmiValues] = useState({ bmi: "", bmiPrime: "" }) ;
	const [bmiClass, changeBmiClass] = useState(null) ;

	// Prop-derived state updates
	useEffect(() => {
		changeFormValues((state) => ({
			...state,
			weightMetric, heightMetric,
			lockSetting: heightMetric ? 'Locked height' : 'Unlocked height'
		})) ;

		if (weightMetric && heightMetric) {
			const bmiValues = calcBMIValues(weightMetric, heightMetric) ;
			changeBmiValues(bmiValues) ;
			changeBmiClass(getBmiClass(bmiValues.bmiPrime)) ;
		}
	}, [weightMetric, heightMetric]) ;

	// Set and remove error-status for the specified category
	function setErrorStatus(category, msg) {
		utils.setErrorStatus(changeErrorStatusList, category, msg) ;
		if (msg) changeBmiClass(null) ;
	}

	// Returns boolean denoting whether there is currently an error
	function isError() {
		return utils.isError(errorStatusList) ;
	}
	// Returns boolean denoting whether there is currently an error
	function isSpecificError(category) {
		return utils.isSpecificError(errorStatusList, category) ;
	}

	function handleChange([field, value]) {
		const newFormValues = {...formValues, [field]: value} ;
		changeFormValues(newFormValues) ;

		// Recalculate BMI values and class on weight or height change (this function only called for valid values)
		if (field === 'weightMetric' || field === 'heightMetric') {
			if (newFormValues.weightMetric && newFormValues.heightMetric) {
				const bmiValues = calcBMIValues(newFormValues.weightMetric, newFormValues.heightMetric) ;
				changeBmiValues(bmiValues) ;
				changeBmiClass(getBmiClass(bmiValues.bmiPrime)) ;
			}
			else changeBmiClass(null) ;
		}
	}

	// Get BMI class corresponding to bmi-prime value
	function getBmiClass(bmiPrimeSearch) {
		let bmiClassFound ;
		bmiPrimeAndClassTable.forEach(([bmiPrime, bmiClass]) => {
			if (bmiPrime <= bmiPrimeSearch) bmiClassFound = bmiClass ;
		}) ;
		return bmiClassFound ;
	}

	// Call callback for recording the weight/height in the user's profile
	function recordWeightAndHeight() {
		handleRecordWeightAndHeight(formValues.weightMetric, formValues.heightMetric) ;
	}

  return (
    <Card className="component-bmi-calc-card text-center">
			<Card.Body className="p-2 d-flex flex-column gap-3">
				<Card.Title>BMI Calculator</Card.Title>

				<div className="bmi-calc-locked-height-buttons">
					<ButtonsRadio
						id='lock_setting'
						value={formValues.lockSetting}
						onChange={(lockSetting) => handleChange(['lockSetting', lockSetting])}
						opts={['Locked height', 'Unlocked height']}
						buttonVariant='outline-secondary'
					/>
				</div>

				<Row>
					<Col md>
						<Form.Label htmlFor="Weight_i1">Weight</Form.Label>
						<UnitsInput unitType="Weight" unitOpts={weightUnitOpts} metricValue={formValues.weightMetric} setErrorStatus={setErrorStatus}
							currentUnit={weightUnits} onValueChange = {(metricVal) => handleChange(['weightMetric', metricVal])}
							className={isSpecificError('Weight') ? 'is-invalid' : ''}
							conversionFunc = {convertWeight} />
					</Col>

					<Col md>
						<Form.Label htmlFor="Height_i1">Height</Form.Label>
						<UnitsInput unitType="Height" unitOpts={heightUnitOpts} metricValue={formValues.heightMetric} setErrorStatus={setErrorStatus}
							currentUnit={heightUnits} onValueChange = {(metricVal) => handleChange(['heightMetric', metricVal])} 
							conversionFunc = {convertHeight}
							className={isSpecificError('Height') ? 'is-invalid' : ''}
							disabled={formValues.lockSetting === 'Locked height'} />
					</Col>
				</Row>

				<div>
					<div className="fw-bold bmi-calc-class">{bmiClass ?? ' '}</div>	
					<Row>
						<Col className={bmiClassToCSSClass[bmiClass]}>
							<input readOnly value={(isError() || !formValues.weightMetric || !formValues.heightMetric) ? '' : `${bmiValues.bmi}`} className="text-center" />
							<input readOnly value={(isError() || !formValues.weightMetric || !formValues.heightMetric) ? '' : `(Prime = ${bmiValues.bmiPrime})`} className="text-center" />
						</Col>
					</Row>
				</div>
      </Card.Body>
			<Card.Footer>
				<Button onClick={recordWeightAndHeight} disabled={(isError() || !formValues.weightMetric || !formValues.heightMetric)}>Record as current</Button>
			</Card.Footer>
    </Card>
  );
}