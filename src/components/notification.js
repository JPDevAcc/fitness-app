import "./css/notification.scss"
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Notification({data: {image, imageLink, title, msgMain, msgMainLink, msgSub}}) {
	const navigate = useNavigate() ;

	function handleNavigation(link) {
		if (link) navigate(link) ;
	}

  return (
    <Card className="my-notification-card text-center">
			<Card.Body className="p-2">
				<div className="d-flex align-items-center gap-2">
					<div className={msgMainLink ? 'notification-image my-link-pointer' : 'notification-image'} onClick={() => handleNavigation(imageLink)}>
						<img src={image} alt="" />
					</div>
					<Card.Title>{title}</Card.Title>
				</div>

        <Card.Text onClick={() => handleNavigation(msgMainLink)} className={msgMainLink ? 'link-primary my-link-pointer fs-3' : 'fs-3'}>{msgMain}</Card.Text>
				<Card.Text className="fs-6">{msgSub}</Card.Text>
      </Card.Body>
    </Card>
  );
}