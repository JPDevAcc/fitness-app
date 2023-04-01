import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

export default function ButtonsRadio({id, name, value, onChange, disabled, opts, buttonVariant}) {
	function buildOptions(opts) {
		return opts.map((opt, i) => 
			<ToggleButton variant={buttonVariant}
				key={(opt.value === undefined) ? opt : opt.value} 
				name={name || id}
				id={id + i}
				value={(opt.value === undefined) ? opt : opt.value}
				disabled={disabled}
			>
				{opt.displayName || ((opt.value === undefined) ? opt : opt.value)}
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