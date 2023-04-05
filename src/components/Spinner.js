import "./css/spinner.scss";
import ReactSpinner from 'react-bootstrap/Spinner';

export default function Spinner({isActive}) {
  return (
		<>
		{(isActive) &&
			<div className="component-spinner">
				<ReactSpinner role="status" animation="border" variant="primary" />
			</div>}
		</>
	)
}