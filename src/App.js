// Main CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// React and other packages
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

// React-bootstrap components
import { Container, Row } from "react-bootstrap";

// Core network services (try not to add to this list unless necessary!)
import UserService from "./services/userService";
import UserPrefsService from "./services/userPrefsService";
import UserProfileService from "./services/userProfileService";

// Our components
import NavigationBar from "./components/navbar.component";
import Footer from "./components/footer.component";


// Our views (pages)
import UserRegister from "./views/UserRegister";
import Login from "./views/Login";
import UserSitePrefs from "./views/UserPrefs";
import UserProfile from "./views/UserProfile";
import Dashboard from "./views/Dashboard";
import UserAccountSettings from "./views/UserAccountSettings";
import Recipes from './views/Recipes';
import Exercises from './views/Exercises';

// Contexts (global data)
import { UserContext } from "./contexts/User"; // Stores user-prefs and profile data
import Message from "./components/message";
import NetService from "./services/netService";


// ==============================================================================

export default function App() {
	const [state, dispatch] = React.useContext(UserContext);

	const [token, setToken] = useState(window.localStorage.getItem('token'));
	const [initComplete, changeInitComplete] = useState(false);

	const commonData = {
		net: { tokenProvider: () => token, logoutHandler: logout, errHandler: setErrorFromNetResponse }
	};

	const userService = new UserService(commonData.net);
	const navigate = useNavigate();

	function login(token) {
		window.localStorage.setItem('token', token);
		setToken(token);
	}

	// === Retrieve user data ===
	function getUserData() {
		const userPrefsService = new UserPrefsService(commonData.net);
		const userProfileService = new UserProfileService(commonData.net);
		Promise.all([userPrefsService.retrieve(), userProfileService.retrieve()])
			.then(([{ data: prefsData }, { data: profileData }]) => {
				console.log("SETTING INITIAL DATA FROM ENDPOINTS");
				dispatch({ type: "setPrefs", data: prefsData || {} });
				dispatch({ type: "setProfile", data: profileData || {} });
				if (!(prefsData?.onboardingStageComplete)) navigate('/prefs'); // Start or resume setting up site prefs
				else if (!(profileData?.onboardingStageComplete)) navigate('/profile/main'); // Start or resume setting up user profile

				changeInitComplete(true);
			});
	}

	// Get user prefs and profile info straight after login
	useEffect(() => {
		if (token) getUserData(); // Development note: This gets called twice in strict mode (which is expected behavior)
	}, [token]);

	// ==============================================================================

	function logout() {
		userService.logout();
		window.localStorage.removeItem('token');
		setToken(null);
		changeInitComplete(null);
		navigate('/');
	}

	// Error handling
	const [msgData, setMsgData] = useState({ msg: null, type: null });
	function setError(msg) {
		setMsgData({ type: "err", msg });
	}
	function setErrorFromNetResponse(statusCode, statusPhrase, errorMessage) {
		if (statusCode !== null) {
			const msg = statusCode + ': ' + statusPhrase + (errorMessage ? (" (" + errorMessage + ")") : "");
			setError(msg);
		}
		else setError(null);
	}

	const [recipes, changeRecipes] = useState([]);

	const netService = new NetService(commonData.net);

	const [exercises, changeExercises] = useState([]);




	// Template
	return (
		<>
			<Message msgData={msgData} setMsgData={setMsgData} />
			<NavigationBar logout={logout} />
			<Container className="my-container">
				<main className="main-container">

					<Routes>
						<Route path="/register" element={
							<UserRegister viewCommon={commonData} />
						} />
						{(initComplete) &&
							<Route path="/prefs" element={
								<UserSitePrefs viewCommon={commonData}
									nextPage={!state.prefs.onboardingStageComplete && "/profile/main"} />
							} />}

						{(initComplete) &&
							<Route path="/profile/:section" element={
								<UserProfile viewCommon={commonData}
									nextPage={!state.profile.onboardingStageComplete && "/"} />
							} />}
						{(token) &&
							<Route path="/account" element={
								<UserAccountSettings viewCommon={commonData}
									logout={logout} />
							} />}

						<Route path="/" element={
							<>
								{(initComplete) ?
									<Dashboard
										viewCommon={commonData}
									/> :
									(!token) && <Login
										viewCommon={commonData}
										login={login}
									/>}
							</>
						} />

						{(initComplete) &&
							<Route path="/recipe" element={
								<Recipes viewCommon={commonData}
									netService={netService}
									recipes={recipes}
									changeRecipes={(recipes) => changeRecipes(recipes)}

								/>
							} />}
							

						{(initComplete) &&
							<Route path="/exc" element={
								<Exercises viewCommon={commonData}
								exercises={exercises}
								changeExercises={(exercises) => changeExercises(exercises)}

								/>
							} />}


						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</Container>
			<Footer />
		</>
	);
}