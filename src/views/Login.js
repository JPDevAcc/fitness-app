import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from 'react';
import UserService from '../services/user';

function Login(props) {
    const userService = new UserService(props.viewCommon.net);
    const [disabled, changeDisabled] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();
        changeDisabled(true);

        console.log(event.target.username.value, event.target.password.value)
        userService.login(event.target.username.value, event.target.password.value)
            .then((response) => {
                changeDisabled(false);
                console.log(response)
                props.login(response.data.token);
                console.log("Success!")
            })
            .catch((err) => {
                console.log(err);
                changeDisabled(false);
            });
    }

    return (
        <div className='login-view'>
            <h1>Login</h1>

            <Form onSubmit={(event) => submitHandler(event)}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className='username'
                        name="username"
                    // onChange={(event) => handleChange(event)}
                    // disabled={successMsg}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='password'
                        name="password"
                        type="password"
                    // onChange={(event) => handleChange(event)}
                    // disabled={successMsg}
                    />
                </Form.Group>
                <div className="text-center my-4">
                    <Button variant="primary" type="submit">Login</Button>
                </div>
            </Form>


        </div>
    )
}

export default Login