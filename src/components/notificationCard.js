import "./css/notificationCard.scss"
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotificationCard({data: {imageUrl, imageLink, title, msgMain, msgMainLink, msgSub, acceptCallback, dismissCallback}}) {
	const navigate = useNavigate() ;

	function handleNavigation(link) {
		if (link) navigate(link) ;
	}

  return (
    <Card className="component-notification text-center">
			<Card.Body className="p-2">
				<div className="d-flex align-items-center gap-2">
					<div className={imageLink ? 'notification-image my-link-pointer' : 'notification-image'} onClick={() => handleNavigation(imageLink)}>
						<img src={imageUrl} alt="" />
					</div>
					<Card.Title className="fs-6">{title}</Card.Title>
				</div>

        <Card.Text onClick={() => handleNavigation(msgMainLink)} className={msgMainLink ? 'link-primary my-link-pointer fs-3' : 'fs-3'}>{msgMain}</Card.Text>
				<Card.Text className="fs-6">{msgSub}</Card.Text>
      </Card.Body>

		{(acceptCallback || dismissCallback) &&
			<Card.Footer className="d-flex justify-content-evenly">
				{acceptCallback && <Button onClick={acceptCallback}>Accept</Button>}
				{dismissCallback && <Button onClick={dismissCallback}>Dismiss</Button>}
			</Card.Footer>}
    </Card>
  );
}