import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function NavigationBar(props) {
    return (
        <Navbar expand="lg" className="navbar-dark bg-dark">
            <Container fluid>
                <Navbar.Brand href="#"> Vitality Network 💪</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/">Login</Link>
                        <Link className="nav-link" to="/">Logout</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                        <Button onClick={props.logout}>Logout</Button>
                    </Nav>
                    <Form className="d-flex" >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
