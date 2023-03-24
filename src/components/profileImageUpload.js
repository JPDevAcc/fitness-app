import "./css/profileImageUpload.scss";
import { Button } from 'react-bootstrap';
import ImageUpload from '../components/imageUploadButton';

export default function ProfileImageUpload({image, handleImageUpload, handleImageRemove}) {

  return (
		<div className="component-profile-image-upload">
			<div id="profile_image_title" className="text-center fw-bold mb-1">Profile Image</div>
			<div className="profile-image">
				<img src={image} aria-labelledby="profile_image_title" alt="" />
			</div>
			<div className="image-upload-container-inner d-flex justify-content-center">
				<ImageUpload handleFileUpload={handleImageUpload} />
			{image &&
				<Button variant="outline-primary" className="m-3" onClick={handleImageRemove}>Remove</Button>}
			</div>
		</div>
  );
}