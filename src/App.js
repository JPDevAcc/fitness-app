import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserRegister from "./views/UserRegister";
import { Container } from "react-bootstrap";
import NavigationBar from "./components/navbar.component";
import Footer from "./components/footer.component";

function App() {
	function login(token) {
		window.localStorage.setItem('token', token);
		setToken(token);
	}

	function logout() {
		window.localStorage.removeItem('token');
		setToken(null);
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