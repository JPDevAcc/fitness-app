import './css/CustomWorkout.scss'
import SingleCustomCard from '../components/SingleCustomCard'
import ExerciseAPIClient from '../services/ExerciseAPIClient'
import UnsplashAPIClient from '../services/UnsplashAPIClient'
import { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Card } from 'react-bootstrap'

function CustomWorkout(props) {

    const exerciseAPIClient = new ExerciseAPIClient(props.viewCommon.net)

    const unsplashAPIClient = new UnsplashAPIClient(props.viewCommon.net)

    const [customWorkouts, changeCustomWorkouts] = useState([])
    const [addedExercises, changeAddedExercises] = useState([])

    const [formValues, changeFormValues] = useState({
        title: '',
        sets: '',
        exerciseID: '',
        exerciseName: '',
        reps: ''
    })

    const [exercises, changeExercises] = useState([])

    useEffect(() => {
        const getWorkouts = async () => {
            const response = await exerciseAPIClient.getCustomWorkouts()
            const data = await response.data
            changeCustomWorkouts([...data])
        }
        getWorkouts()
    }, [])

    const generateCustomCards = () => {
        return customWorkouts?.map((customWorkout, index) =>
            <SingleCustomCard key={index} customWorkout={customWorkout} />
        )
    }

    const showList = () => {
        return (
            <ol>
                {addedExercises?.map((exercise, index) =>
                    <li key={index}>{exercise[0]} {exercise[1]}</li>)}
            </ol>
        )
    }

    const transferID = (id, name) => {
        changeFormValues({
            ...formValues,
            exerciseID: id,
            exerciseName: name
        })
    }

    const displayExercises = () => {
        return exercises?.map((exercise, index) => {
            while (index < 20) {
                return (
                    <Card onClick={() => transferID(exercise.id, exercise.name)} className='exc-card' key={index} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{exercise.name}</Card.Title>
                        </Card.Body>
                    </Card>
                )
            }
        })
    }



    const getExercises = async (event) => {
        event.preventDefault()
        const bodypart = event.target[0].value
        const response = await exerciseAPIClient.getExercise(bodypart)
        const exercisesList = await response.data
        changeExercises(exercisesList)
    }

    const addExercise = (event) => {
        event.preventDefault()
        const newExercise = [event.target[0].value, event.target[1].value + ' reps']
        changeAddedExercises([...addedExercises, newExercise])
    }

    const addWorkoutToDatabase = async (workout) => {
        try {
            const response = await exerciseAPIClient.addCustomWorkout(workout)
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    const addWorkout = async () => {
        const imageData = await unsplashAPIClient.getSpecPic('workout')
        console.log(imageData)
        const image = imageData.data[0].urls.regular
        const customWorkout = {
            image: image,
            title: document.getElementById('formWorkoutname').value,
            sets: document.getElementById('formWorkoutSets').value,
            exercises: [...addedExercises]
        }

        console.log(customWorkout)

        addWorkoutToDatabase(customWorkout)
        const response = await exerciseAPIClient.getCustomWorkouts()
        const workouts = await response.data
        changeCustomWorkouts([...workouts])
    }

    return (
        <>
            <Row className='custom-workout-container'>
                <Col lg={4} className='left-section'>
                    {generateCustomCards()}
                </Col>
                <Col lg={8} className='right-section'>
                    <Col lg={6} className='form-section'>
                        <Form.Group controlId="formWorkoutname">
                            <Form.Control type="text" placeholder="Custom workout title" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formWorkoutSets">
                            <Form.Control type="text" placeholder="Sets" />
                        </Form.Group>
                        <br />
                        <br />
                        <Form onSubmit={(event) => addExercise(event)} className='form-add-exercise'>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Exercise name" defaultValue={formValues.exerciseName} />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Reps" defaultValue={formValues.reps} />
                            </Form.Group>
                            <br />
                            <Button className='orange-button' variant="primary" type="submit">Add</Button>
                        </Form>
                        <div className='exc-list'>
                            {showList()}
                        </div>
                        <Button onClick={addWorkout} className='orange-button' variant="primary" >Create</Button>
                    </Col>
                    <Col className='card-section'>
                        <Form onSubmit={getExercises}>
                            <Form.Select className='form-drop-bodypart' size="md">
                                <option>Body part</option>
                                <option>back</option>
                                <option>lower arms</option>
                                <option>shoulders</option>
                                <option>upper arms</option>
                                <option>cardio</option>
                                <option>lower legs</option>
                                <option>upper legs</option>
                                <option>neck</option>
                                <option>waist</option>
                            </Form.Select>
                            <br />
                            <Button className='orange-button' variant="primary" type="submit">Find exercises</Button>
                        </Form>

                        <br />
                        {displayExercises()}
                    </Col>
                </Col>
            </Row>
        </>
    )
}

export default CustomWorkout