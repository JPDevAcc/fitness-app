import './css/CustomWorkout.scss'
import SingleCustomCard from '../components/SingleCustomCard'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'


function CustomWorkout() {

    const [customWorkouts, setCustomWorkouts] = useState([])

    const generateCustomCards = () => {
        return customWorkouts.map((customWorkout) => {
            return <SingleCustomCard />
        })
    }



    return (
        <>
            <Row className='custom-workout-container'>
                <Col lg={4} className='left-section'>
                    CustomWorkouts
                    {generateCustomCards()}
                </Col>
                <Col className='right-section'>
                    <div className='form-section'>
                        <Form className='form'>
                            <Form.Group controlId="formBasicEmail">
                                {/* <Form.Label>Workout Name</Form.Label> */}
                                <Form.Control type="text" placeholder="Custom workout title" />
                            </Form.Group>
                        </Form>
                        <br />
                        <Form.Select className='form-drop' size="md">
                            <option>sets</option>
                            <option>1 set</option>
                            <option>2 sets</option>
                            <option>3 sets</option>
                            <option>5 sets</option>
                            <option>8 sets</option>
                            <option>10 sets</option>
                            <option>12 sets</option>
                            <option>15 sets</option>
                            <option>20 sets</option>
                            <option>25 sets</option>
                            <option>30 sets</option>
                        </Form.Select>
                        <br />
                        <br />
                        <Form.Select className='form-drop' size="md">
                            <option>Body part</option>
                            <option>Arms</option>
                            <option>Back</option>
                            <option>Chest</option>
                            <option>Legs</option>
                            <option>Shoulders</option>
                        </Form.Select>
                        <br />
                        <Form className='form'>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Exercise ID" />
                            </Form.Group>

                        </Form>
                        <br />
                        <Form.Select className='form-drop' size="md">
                            <option>reps</option>
                            <option>5 reps</option>
                            <option>8 reps</option>
                            <option>10 reps</option>
                            <option>12 reps</option>
                            <option>15 reps</option>
                            <option>20 reps</option>
                            <option>25 reps</option>
                            <option>30 reps</option>
                        </Form.Select>
                        <br />
                        <Button variant="primary" type="submit">Add</Button>
                        <br />
                        <br />
                        <Button variant="primary" type="submit">Create</Button>

                    </div>
                    <div className='card-section'>
                        <Button variant="primary" type="submit">Add</Button>
                    </div>


                </Col>
            </Row>
        </>
    )
}

export default CustomWorkout