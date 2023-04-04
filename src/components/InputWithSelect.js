import Form from "react-bootstrap/Form"

export default function InputWithSelect({
	inputId,
	selectId,
	inputName,
	selectName,
	inputValue,
	selectValue,
	inputPlaceholder,
	inputOnChange,
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
				<Form.Control name={inputName || inputId} id={inputId} value={inputValue} onChange={inputOnChange} placeholder={inputPlaceholder} disabled={disabled} className={className}/>
				<Form.Select name={selectName || selectId} id={selectId} value={selectValue} onChange={selectOnChange} disabled={disabled} >
					{buildOptions(opts)}
				</Form.Select>
			</div>
  );
}