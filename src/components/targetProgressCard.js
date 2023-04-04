import "./css/targetProgressCard.scss"
import { Card, ProgressBar } from "react-bootstrap";
import { roundValue } from "../utils/units";

export default function TargetProgressCard({imageUrl, title, percent, initial, target}) {

  return (
    <Card className="component-target-progress-card text-center">
			<Card.Title>{title}</Card.Title>
			<Card.Body className="p-2">
				<div className="d-flex align-items-center gap-2">
						<div className='target-progress-card-image d-none d-sm-block'>
							<img src={imageUrl} alt="" />
						</div>
					<span className="target-progress-card-smalltext">{initial}</span>
					<ProgressBar className="target-progress-card-bar" now={percent} label={`${roundValue(percent)}%`} />
					<span className="target-progress-card-smalltext">{target}</span>
				</div>
      </Card.Body>
    </Card>
  );
}