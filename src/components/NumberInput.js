import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function NumberInput({
	inputId,
	inputName,
	inputValue,
	inputPlaceholder,
	inputOnChange,
	disabled,
	className,
	setErrorStatus
}) {

	const inputNameOrId = inputName || inputId ;

	// Form fields
	const [value, changeValue] = useState(inputValue) ;

	useEffect(() => {
		changeValue(inputValue) ;
		const isValid = (!inputValue || (/^[0-9]+(\.[0-9]+)?$/.test(inputValue))) ;
		if (setErrorStatus) {
			if (isValid) setErrorStatus(inputNameOrId, null) ;
			else setErrorStatus(inputNameOrId, `Invalid ${inputNameOrId} value`) ;
		}
	}, [inputValue]) ;

	// Handle form field user-input
  const handleChange = (e) => {
		const newValue = e.target.value;
		
		const isValid = (!newValue || (/^[0-9]+(\.[0-9]+)?$/.test(newValue))) ;
		if (setErrorStatus) {
			if (isValid) setErrorStatus(inputNameOrId, null) ;
			else setErrorStatus(inputNameOrId, `Invalid ${inputNameOrId} value`) ;
		}

		if (isValid) inputOnChange(newValue || "") ;
		changeValue(newValue) ;
  }

	// Template
  return (
		<Form.Control
			id={inputId}
			name={inputNameOrId}
			value={value}
			onChange={handleChange}
			placeholder={inputPlaceholder}
			disabled={disabled}
			className={className}
		/>
  );
}