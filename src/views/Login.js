import './css/Login.scss'
import logo from '../components/Images/logo.png'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from 'react';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const userService = new UserService(props.viewCommon.net);
    const [disabled, changeDisabled] = useState(false);

    useEffect(() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, [])


    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        changeDisabled(true);

        userService.login(event.target.username.value, event.target.password.value)
            .then((response) => {
                changeDisabled(false);
                props.login(response.data.token);
                console.log("Success!")
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                changeDisabled(false);
            });
    }

    return (
        <div className='login-wrapper'>
            <Form className='login-form' onSubmit={(event) => submitHandler(event)}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className='username'
                        name="username"
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='password'
                        name="password"
                        type="password"
                    />
                </Form.Group>
                <div className="button text-center my-4">
                    <Button className='orange-button' variant="primary" type="submit">Login</Button>
                </div>
            </Form>
            <img className='logo-login' src={logo} alt="logo" />
        </div>
    )
}

export default Login