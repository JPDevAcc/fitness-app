// CSS
import "./css/showProfile.scss"

// React and other packages
import { useState, useEffect } from "react";
import { useParams } from 'react-router';

// Network services
import UserProfileService from "../services/userProfileService";

// Our components
import ProfileModal from "../components/ProfileModal";

// ==============================================================================

export default function ShowProfile({viewCommon}) {
	const { userName } = useParams();
	const [userProfile, changeUserProfile] = useState(null) ;
	const [isActive, changeIsActive] = useState(false) ;
	const userProfileService = new UserProfileService(viewCommon.net) ;

	useEffect(() => {
		userProfileService.getProfile(userName).then(({data}) => {
			changeUserProfile(data) ;
			changeIsActive(true) ;
		}) ;
	}, [userName]) ;

	return (
		<>
			<div className="page-showprofile">
				<ProfileModal userProfile={userProfile} show={isActive} onHide={() => changeIsActive(false)} />
			</div>
		</>
  )
}