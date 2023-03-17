import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserRegister from "./views/UserRegister";
import Login from './views/Login';
import { Container } from "react-bootstrap";
import NavigationBar from "./components/navbar.component";
import Footer from "./components/footer.component";
import { useState } from 'react';
import UserService from "./services/user";

function App() {
	const [token, setToken] = useState(window.localStorage.getItem('token'));

	const viewCommon = {
		net: { tokenProvider: () => token, logoutHandler: () => { }, errHandler: setError }
	};

	const userService = new UserService(viewCommon.net);
	const navigate = useNavigate();

	function login(token) {
		window.localStorage.setItem('token', token);
		setToken(token);
	}

	function logout() {
		userService.logout();
		window.localStorage.removeItem('token');
		setToken(null);
		navigate('/');

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
						<Route path="/" element={
							<>
								{(token) ?
									<Dashboard viewCommon={viewCommon}
									/> :
									<Login
										viewCommon={viewCommon}
										login={login}
									/>}
							</>
						} />
					</Routes>
				</main>
			</Container>
			<Footer />
		</>
	);
}

export default App;