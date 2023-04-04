import "./css/removableTile.scss"
import { Button } from 'react-bootstrap';

export default function RemovableTile({id, title, image, handleRemove}) {
  return (
		<div id={id} className="component-removable-tile">
			<div className="text-center fw-bold">{title}</div>
			<div className="removable-tile-image">
				<img src={image} aria-labelledby={id} alt="" />
			</div>
			<Button variant="outline-primary" className="w-100" onClick={() => handleRemove(id)}>Remove</Button>
		</div>
  );
}