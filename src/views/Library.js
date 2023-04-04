import './css/library.scss'
import '../components/css/recipeCard.scss'
import { Row, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import FoodAPIClient from '../services/foodApiService'
import ExerciseAPIClient from '../services/exerciseApiService'
import SingleRecipeCard from '../components/SingleRecipeCard'
import { useNavigate } from 'react-router-dom'

function Library(props) {

    const navigate = useNavigate();


    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);
    const exerciseAPIClient = new ExerciseAPIClient(props.viewCommon.net);

    // const [savedWorkouts, changeSavedWorkouts] = useState([]);
    console.log(props.savedWorkouts)

    useEffect(() => {
        const getUserRecipes = async () => {
            const response = await foodAPIClient.getUserRecipes()
            props.changeSavedRecipes(response.data)
        }
        const getUserWorkouts = async () => {
            const response = await exerciseAPIClient.getCustomWorkoutForUser()
            const workouts = await response.data
            props.changeSavedWorkouts([...workouts])
        }
        getUserRecipes()
        getUserWorkouts()
    }, [])

    const showRecipes = () => {
        return props.savedRecipes?.map((recipe) =>
            <SingleRecipeCard
                key={recipe._id}
                title={recipe.title}
                id={recipe.id}
                imgUrl={recipe.imageUrl}
                viewCommon={props.viewCommon}
                currentRecipe={props.currentRecipe}
            />
        )
    }

    const showWorkoutPage = (workout) => {
        props.changeCurrentCustomWorkout(workout)
        navigate('/custompage')
    }

    const showWorkouts = () => {
        console.log(props.savedWorkouts)
        return props.savedWorkouts?.map((workout) =>
            <Card onClick={() => showWorkoutPage(workout)} className='recipe-card' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={workout.image} />
                <Card.Body>
                    <Card.Title>{workout.title}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    return (
        <>
            <h1>My recipes</h1>
            <div className='recipe-wrapper' >
                {showRecipes()}
            </div>
            <h1>My workouts</h1>
            <div className='recipe-wrapper'>
                {showWorkouts()}
            </div>
        </>
    )
}

export default Library