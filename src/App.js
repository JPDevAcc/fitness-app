import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import UserRegister from "./views/UserRegister";
import Login from './views/Login';
import { Container } from "react-bootstrap";
import NavigationBar from "./components/navbar.component";
import Footer from "./components/footer.component";
import { useState, useEffect } from 'react';
import UserPrefsService from "./services/userPrefs";
import UserSitePrefs from "./views/UserPrefs";
import UserProfileService from "./services/userProfile";
import UserProfile from './views/UserProfile';
import UserService from "./services/user";
import { UserContext } from "./contexts/User"

function App() {
	const [ state, dispatch ] = React.useContext(UserContext) ;

	const [token, setToken] = useState(window.localStorage.getItem('token'));
	const [initComplete, changeInitComplete] = useState(false) ;

	const viewCommon = {
		net: { tokenProvider: () => token, logoutHandler: () => { }, errHandler: setError }
	};

	const userService = new UserService(viewCommon.net);
	const navigate = useNavigate();

	const commonData = {
		net: { tokenProvider: () => token, logoutHandler: logout, errHandler: setError }
	} ;

	function login(token) {
		window.localStorage.setItem('token', token);
		setToken(token);
	}

	// === Retrieve user data ===
	function getUserData() {
		const userPrefsService = new UserPrefsService(commonData.net);
		const userProfileService = new UserProfileService(commonData.net);
		Promise.all([userPrefsService.retrieve(), userProfileService.retrieve()])
		.then(([{data: prefsData}, {data: profileData}]) => {
			console.log("SETTING INITIAL DATA FROM ENDPOINTS") ;
			dispatch({ type: "setPrefs", data: prefsData }) ;
			dispatch({ type: "setProfile", data: profileData }) ;
			if (!(prefsData?.onboardingStageComplete)) navigate('/prefs') ; // Start or resume setting up site prefs
			else if (!(profileData?.onboardingStageComplete)) navigate('/profile') ; // Start or resume setting up user profile

			changeInitComplete(true) ;
		}) ;
	}

	// Get user prefs and profile info straight after login
	useEffect(() => {
		if (token) getUserData() ; // Development note: This gets called twice in strict mode (which is expected behavior)
	}, [token]) ;

	// =========================

	function logout() {
		userService.logout();
		window.localStorage.removeItem('token');
		setToken(null);
		changeInitComplete(null) ;
		navigate('/') ;
	}

	const [msgData, setMsgData] = useState({ msg: null, type: null });

	// Error handling
	function setError(msg) {
		setMsgData({ type: "err", msg });
	}

	return (
		<>
			<NavigationBar logout={logout} />
			<Container className="my-container">
				<main>
					<Routes>
						<Route path="/register" element={
							<UserRegister viewCommon={viewCommon} />
						} />
					{(initComplete) &&
						<Route path="/prefs" element={
							<UserSitePrefs viewCommon={commonData}
								nextPage={!state.prefs.onboardingStageComplete && "/profile"} />
						} />}

						{(initComplete) &&
						<Route path="/profile" element={
							<UserProfile viewCommon={commonData}
								nextPage={!state.profile.onboardingStageComplete && "/"} />
						} />}
						
						<Route path="/" element={
							<>
								{(initComplete) ?
									<Dashboard
										viewCommon={viewCommon}
									/> :
									(!token) && <Login
										viewCommon={viewCommon}
										login={login}
									/>}
							</>
						} />

						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</Container>
			<Footer />
		</>
	);
}

export default App;