import Form from "react-bootstrap/Form"

export default function Select({id, labelText, name, value, onChange, disabled, opts}) {
	
	function buildOptions(opts) {
		return opts.map((opt, i) => 
			<option key={i} value={opt.value}>{opt.displayName || opt.value}</option>
		) ;
	}

	// Template
  return (
		<Form.Group controlId={id}>
			<Form.Label>{labelText}</Form.Label>
			<Form.Select name={name || id} value={value} onChange={onChange} disabled={disabled}>
				{buildOptions(opts)}
			</Form.Select>
		</Form.Group>
  );
}