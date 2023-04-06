import InputWithSelect from "./InputWithSelect";
import Input2WithSelect from "./Input2WithSelect";
import { useEffect, useState } from "react";
import { roundValue } from "../utils/units" ;

export default function UnitsInput({
	labelText,
	unitType,
	unitOpts,
	metricValue,
	currentUnit,
	onValueChange,
	disabled,
	className,
	conversionFunc,
	setErrorStatus
}) {
	
	const input1Id = unitType + '_i1' ;
	const input2Id = unitType + '_i2' ;
	const selectId = unitType + '_select' ;

	// Form fields
	const [formValues, changeFormValues] = useState({
		[input1Id]: "",
		[input2Id]: "",
		[selectId]: "",
		metricValue: ""
	}) ;

	useEffect(() => {
		// Convert from metric and round for display
		let input1Value, input2Value ;
		if (!metricValue) {
			input1Value = '' ;
			input2Value = '' ;
		}
		else {
			[input1Value, input2Value] = conversionFunc([metricValue], unitOpts[0].value, currentUnit) ;
			if (currentUnit.split(' ').length === 1) input1Value = roundValue(input1Value, 1) ;
			else input2Value = roundValue(input2Value, 1) ;
		}

		changeFormValues({
			[input1Id]: input1Value,
			[input2Id]: input2Value,
			[selectId]: currentUnit,
			metricValue
		}) ;
	}, []) ;

	// Handle form field user-input
  const handleChange = (e) => {
		const newFormValues = {...formValues} ;
		const fieldName = e.target.name ;
		const newValue = e.target.value;
		
		let isValid = true ;
		if (e.target.id === selectId) {
			// Convert from metric and round for display
			let input1Value, input2Value ;
			if (!formValues.metricValue) {
				input1Value = '' ;
				input2Value = '' ;
			}
			else {
				[input1Value, input2Value] = conversionFunc([formValues.metricValue], unitOpts[0].value, e.target.value) ;
				if (newValue.split(' ').length === 1) input1Value = roundValue(input1Value, 1) ;
				else input2Value = roundValue(input2Value, 1) ;
			}
			newFormValues[input1Id] = input1Value ;
			newFormValues[input2Id] = input2Value ;
			setErrorStatus(unitType, null) ;
			newFormValues[fieldName] = newValue;
		} else {
			newFormValues[fieldName] = newValue;

			const isValid1 = (!newFormValues[input1Id] || (/^[0-9]+(\.[0-9]+)?$/.test(newFormValues[input1Id]))) ;
			const isValid2 = (!newFormValues[input2Id] || (/^[0-9]+(\.[0-9]+)?$/.test(newFormValues[input2Id]))) ;
			isValid = isValid1 && isValid2 ;
			if (setErrorStatus) {
				if (isValid) setErrorStatus(unitType, null) ;
				else setErrorStatus(unitType, `Invalid ${unitType} value`) ;
			}

			// Re-calculate metric value
			if (isValid) {
				const metricValue = conversionFunc([newFormValues[input1Id], newFormValues[input2Id]], newFormValues[selectId], unitOpts[0].value)[0] ;
				onValueChange(metricValue || "") ;
				newFormValues.metricValue = metricValue ;
			}
		}
		changeFormValues(state => ({...state, ...newFormValues})) ;
  }

	// Template
  return (
		<>
		{formValues[selectId].split(' ').length === 1 ?
			<InputWithSelect labelText={labelText} className={className}
				inputId={input1Id} inputValue={formValues[input1Id]} inputOnChange={handleChange} 
				selectId={selectId} selectValue={formValues[selectId]} selectOnChange={handleChange}
				disabled={disabled} opts={unitOpts} />
			:
			<Input2WithSelect labelText={labelText} className={className}
				input1Id={input1Id} input1Value={formValues[input1Id]} input1OnChange={handleChange} 
				input2Id={input2Id} input2Value={formValues[input2Id]} input2OnChange={handleChange} 
				selectId={selectId} selectValue={formValues[selectId]} selectOnChange={handleChange}
				disabled={disabled} opts={unitOpts} />}
		</>
  );
}

