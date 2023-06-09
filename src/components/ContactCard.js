import "./css/contactCard.scss"
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProfileImageUrl } from "../utils/image";

export default function ContactCard({data: {imageUrl, userName}, handleSendMessage, handleRemoveContact}) {
	const navigate = useNavigate() ;

	function handleNavigation(link) {
		if (link) navigate(link) ;
	}

	const imageLink = `/showprofile/${userName}` ;

  return (
    <Card className="component-contact-card text-center">
			<Card.Body className="p-2">
				<div className="d-flex align-items-center gap-2">
					<div className={imageLink ? 'contact-card-image my-link-pointer' : 'contact-card-image'} onClick={() => handleNavigation(imageLink)}>
						<img src={getProfileImageUrl(imageUrl)} alt="" />
					</div>
					<Card.Title className="fs-6">{userName}</Card.Title>
				</div>
      </Card.Body>

			<Card.Footer className="d-flex justify-content-evenly">
				<Button variant="primary" onClick={handleSendMessage}>Send Message</Button>
				<Button variant="danger" onClick={handleRemoveContact}>Remove</Button>
			</Card.Footer>
    </Card>
  );
}