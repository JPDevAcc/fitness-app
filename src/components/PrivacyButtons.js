import "./css/privacyButtons.scss";
import ButtonsRadio from "./ButtonsRadio";

const opts = [
	{value: 'pri', displayName: 'Private'},
	{value: 'mem', displayName: 'Members'},
	{value: 'pub', displayName: 'Public'}
]

export default function PrivacyButtons({id, value, onChange, disabled}) {

	// Template
  return (
		<div className="component-privacy-buttons">
			<ButtonsRadio id={id} value={value} onChange={onChange} disabled={disabled} opts={opts} />
		</div>
  );
}