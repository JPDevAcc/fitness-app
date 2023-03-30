import Form from "react-bootstrap/Form"

export default function Select({id, name, value, onChange, disabled, opts}) {
	
	function buildOptions(opts) {
		return opts.map((opt) => 
			<option
				key={(opt.value === undefined) ? opt : opt.value} 
				value={(opt.value === undefined) ? opt : opt.value}>
				{opt.displayName || ((opt.value === undefined) ? opt : opt.value)}
			</option>
		) ;
	}

	// Template
  return (
		<Form.Select name={name || id} id={id} value={value} onChange={onChange} disabled={disabled}>
			{buildOptions(opts)}
		</Form.Select>
  );
}