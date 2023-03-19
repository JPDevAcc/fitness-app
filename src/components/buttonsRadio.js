import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

export default function ButtonsRadio({id, name, value, onChange, disabled, opts}) {
	
	function buildOptions(opts) {
		return opts.map((opt, i) => 
			<ToggleButton key={i} name={name || id} id={id + i} value={opt.value} disabled={disabled}>
				{opt.displayName || opt.value}
			</ToggleButton>
		) ;
	}

	// Template
  return (
		<ToggleButtonGroup type="radio" name={name || id} value={value} onChange={onChange}>
			{buildOptions(opts)}
		</ToggleButtonGroup>
  );
}