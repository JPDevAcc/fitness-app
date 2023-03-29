import "./css/navbar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "./Images/logo.png";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavigationBar(props) {
    const navigate = useNavigate();
    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="component-navbar">
            <Container fluid>
                <Navbar.Brand href="/#">
                    {" "}
                    Vitality Network{" "}
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Link className="nav-link" to="/">
                            Dashboard
                        </Link>
                        <Link className="nav-link" to="/recipe">
                            Recipes
                        </Link>
                        <Link className="nav-link" to="/exc">
                            Workouts
                        </Link>
                        <Link className="nav-link" to="/community">
                            Community
                        </Link>

                        <hr className="hr-white" />

                        <Link className="d-lg-none nav-link" to="/prefs">
                            Preferences
                        </Link>
                        <Link className="d-lg-none nav-link" to="/profile/main">
                            Profile
                        </Link>

                        <hr className="hr-white" />

                        <Link className="d-lg-none nav-link" to="/account">
                            Account Settings
                        </Link>
                        <Link className="d-lg-none nav-link" onClick={props.logout}>
                            Logout
                        </Link>
                    </Nav>

                    <NavDropdown className="d-none d-lg-block text-white" align="end" flip="true" title={props.userIdentifier}>
												<NavDropdown.Item onClick={() => navigate("contacts")}>Contacts</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("myworkout")}>Custom Workouts</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("library")}>Library</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("prefs")}>Preferences</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("profile/main")}>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => navigate("account")}>Account Settings</NavDropdown.Item>
                        <NavDropdown.Item onClick={props.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
