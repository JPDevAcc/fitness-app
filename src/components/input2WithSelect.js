import Form from "react-bootstrap/Form"

export default function Input2WithSelect({
	input1Id,
	input2Id,
	selectId,
	input1Name,
	input2Name,
	selectName,
	input1Value,
	input2Value,
	selectValue,
	inputPlaceholder,
	input1OnChange,
	input2OnChange,
	selectOnChange,
	disabled,
	opts,
	className
	}) {
	
	function buildOptions(opts) {
		return opts.map((opt, i) => 
			<option key={i} value={opt.value}>{opt.displayName || opt.value}</option>
		) ;
	}

	// Template
  return (
			<div className="d-flex gap-1">
				<Form.Control name={input1Name || input1Id} id={input1Id} value={input1Value} onChange={input1OnChange} placeholder={inputPlaceholder} disabled={disabled} className={className}/>
				<Form.Control name={input2Name || input2Id} id={input2Id} value={input2Value} onChange={input2OnChange} placeholder={inputPlaceholder} disabled={disabled} className={className}/>
				<Form.Select name={selectName || selectId} id={selectId} value={selectValue} onChange={selectOnChange} disabled={disabled} >
					{buildOptions(opts)}
				</Form.Select>
			</div>
  );
}