import InputWithSelect from "./inputWithSelect";
import Input2WithSelect from "./input2WithSelect";
import { useState } from "react";

export default function UnitsComponent({
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

	const [input1Value, input2Value] = conversionFunc([metricValue], unitOpts[0].value, currentUnit) ;

	// Form fields
	const [formValues, changeFormValues] = useState({
		[input1Id]: input1Value,
		[input2Id]: input2Value ?? '',
		[selectId]: currentUnit,
	}) ;

	// Handle form field user-input
  const handleChange = (e) => {
		const oldUnit = formValues[selectId] ;
		const newFormValues = {...formValues} ;
		const fieldName = e.target.name ;
		const newValue = e.target.value;

		let isValid = true ;
		if (e.target.id === selectId) {
			const inputVal1 = (/^\d*[\\.]?[\d]*$/.test(formValues[input1Id])) ? formValues[input1Id] : 0 ;
			const inputVal2 = (/^\d*[\\.]?[\d]*$/.test(formValues[input2Id])) ? formValues[input2Id] : 0 ;
			const [input1Value, input2Value] = conversionFunc([inputVal1, inputVal2], oldUnit, e.target.value) ;
			// console.log("CONVERT ", [formValues[input1Id], formValues[input2Id]], oldUnit, e.target.value, input1Value, input2Value) ;
			newFormValues[input1Id] = input1Value ;
			newFormValues[input2Id] = input2Value ?? "";
			setErrorStatus(unitType, null) ;
		} else {
			isValid = (/^\d*[\\.]?[\d]*$/.test(e.target.value)) ;
			if (setErrorStatus) {
				if (isValid) setErrorStatus(unitType, null) ;
				else setErrorStatus(unitType, `Invalid ${unitType} value`) ;
			}
		}

		newFormValues[fieldName] = newValue;
		changeFormValues(newFormValues) ;

		if (isValid) {
			const metricValue = conversionFunc([newFormValues[input1Id], newFormValues[input2Id]], newFormValues[selectId], unitOpts[0].value)[0] ;
			onValueChange(metricValue) ;
		}
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

