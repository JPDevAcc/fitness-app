import './css/Library.scss'
import '../components/css/RecipeCard.scss'
import { Row, Card } from 'react-bootstrap'
import { useEffect } from 'react'
import FoodAPIClient from '../services/FoodApiClient'
import { ReactComponent as Heart } from '../components/Images/heart.svg'
import { ReactComponent as Redheart } from '../components/Images/redheart.svg'
import SingleRecipeCard from '../components/SingleRecipeCard'

function Library(props) {

    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);

    useEffect(() => {
        const getUserRecipes = async () => {
            const response = await foodAPIClient.getUserRecipes()
            props.changeSavedRecipes(response.data)
        }
        getUserRecipes()
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

    return (
        <>
            <h1>My recipes</h1>
            <div className='recipe-wrapper' >
                {showRecipes()}
            </div>
            <h1>My workouts</h1>
        </>
    )
}

export default Library