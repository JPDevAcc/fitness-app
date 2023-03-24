import "./css/navbar.scss" ;
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "./Images/logo.png";

function NavigationBar(props) {
  return (
    <Navbar expand="lg" className="component-navbar navbar-dark bg-dark">
      <Container fluid>
        <Navbar.Brand href="#">
          {" "}
          Vitality Network{" "}
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ filter: "invert(100%)" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className="nav-link" to="/">
              Home
            </Link>
            {/* <Link className="nav-link" to="/register">
              Register
            </Link> */}
            <Link className="nav-link" to="/prefs">
              Site Prefs
            </Link>
            <Link className="nav-link" to="/profile/main">
              Profile
            </Link>
            <Link className="nav-link" to="/account">
              Account Settings
            </Link>
            <Link className="nav-link" to="/recipe">
              Recipes
            </Link>
            <Link className="nav-link" to="/exc">
              Workouts
            </Link>

            <Button onClick={props.logout}>Logout</Button>
          </Nav>
          {/* <Form className="d-flex" >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
