import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserRegister from "./views/UserRegister";
import Login from './views/Login';
import { Container } from "react-bootstrap";
import NavigationBar from "./components/navbar.component";
import Footer from "./components/footer.component";
import APIClientServer from './API/APIClientServer';
import { useState } from 'react';

function App() {
	const [token, setToken] = useState(window.localStorage.getItem('token'));
	const client = new APIClientServer(() => token, logout, setError);

	const navigate = useNavigate();

	function login(token) {
		window.localStorage.setItem('token', token);
		setToken(token);
	}

	function logout() {
		window.localStorage.removeItem('token');
		setToken(null);
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
							<UserRegister />
						} />
						<Route path="/" element={
							<>
								{(token) ?
									<Dashboard
										client={client}
									/> :
									<Login
										client={client}
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