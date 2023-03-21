import "./css/privacyButtons.css";
import ButtonsRadio from "./buttonsRadio";

const opts = [
	{value: 'pri', displayName: 'Private'},
	{value: 'mem', displayName: 'Members'},
	{value: 'pub', displayName: 'Public'}
]

export default function PrivacyButtons({id, value, onChange, disabled}) {

	// Template
  return (
		<div className="privacy-opt-select">
			<ButtonsRadio id={id} value={value} onChange={onChange} disabled={disabled} opts={opts} />
		</div>
  );
}