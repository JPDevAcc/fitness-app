import './css/customWorkout.scss'
import SingleCustomCard from '../components/SingleCustomCard'
import ExerciseAPIClient from '../services/exerciseApiService'
import UnsplashAPIClient from '../services/unsplashApiService'
import { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Card } from 'react-bootstrap'

function CustomWorkout(props) {

    const exerciseAPIClient = new ExerciseAPIClient(props.viewCommon.net)

    const unsplashAPIClient = new UnsplashAPIClient(props.viewCommon.net)

    const [customWorkouts, changeCustomWorkouts] = useState([])
    const [addedExercises, changeAddedExercises] = useState([])

    const [tempExerciseList, changeTempExerciseList] = useState([])

    const [currentExercise, changeCurrentExercise] = useState('')

    const [formValues, changeFormValues] = useState({
        title: '',
        sets: '',
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
            <SingleCustomCard
                key={index}
                customWorkout={customWorkout}
                changeCurrentCustomWorkout={props.changeCurrentCustomWorkout}
            />
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

    const transferID = (id, name, gif) => {
        changeFormValues({
            ...formValues,
            exerciseName: name,
        })

        changeCurrentExercise({
            exerciseID: id,
            gif: gif,
            name: name
        })
    }

    const displayExercises = () => {
        return exercises?.map((exercise, index) => {
            while (index < 50) {
                return (
                    <Card onClick={() => transferID(exercise.id, exercise.name, exercise.gifUrl)} className='exc-card' key={index} style={{ width: '18rem' }}>
                        <Card.Title>{exercise.name}</Card.Title>
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
        changeTempExerciseList(exercisesList)
    }

    const addExercise = (event) => {
        event.preventDefault()
        const newExercise = [event.target[0].value, event.target[1].value + ' reps', currentExercise.gif]
        changeAddedExercises([...addedExercises, newExercise])
    }

    const addWorkoutToDatabase = async (workout) => {
        try {
            const response = await exerciseAPIClient.addCustomWorkout(workout)
        }
        catch (err) {
            console.log(err)
        }
    }

    const addWorkout = async () => {
        const imageData = await unsplashAPIClient.getSpecPic('workout')
        const image = imageData.data[0].urls.regular
        const customWorkout = {
            id: Math.floor(Math.random() * 1000000000),
            image: image,
            title: document.getElementById('formWorkoutname').value,
            sets: document.getElementById('formWorkoutSets').value,
            exercises: [...addedExercises]
        }

        const addWorkOut = await addWorkoutToDatabase(customWorkout)

        const response = await exerciseAPIClient.getCustomWorkouts()
        const data = await response.data
        changeCustomWorkouts([...data])
    }

    const filterExercises = (event) => {
        const filteredExercises = tempExerciseList.filter(exercise => exercise.name.toLowerCase().includes(event.target.value.toLowerCase()))
        changeExercises(filteredExercises)
    }

    const deleteList = () => {
        console.log(formValues)
        changeAddedExercises([])
        changeFormValues({
            title: '',
            sets: '',
            exerciseName: '',
            reps: ''
        })
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
                        <hr className='white' />
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
                        <Button onClick={deleteList} className='orange-btn' variant="primary">Delete List</Button>
                        <Button onClick={addWorkout} className='orange-button' variant="primary" >Create</Button>
                    </Col>
                    <Col lg={5} sm={12} className='card-section'>
                        <Form className='find-form' onSubmit={getExercises}>
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
                        <input onChange={filterExercises} type="text" placeholder="Search..." />

                        <br />
                        {displayExercises()}
                    </Col>
                </Col>
            </Row>
        </>
    )
}

export default CustomWorkout