import "./css/recipeCard.scss"

import { Card, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';

import RecipeModal from './RecipeModal';
import FoodAPIClient from "../services/API/foodApiService";
import { ReactComponent as Heart } from "./Images/heart.svg"
import { ReactComponent as Redheart } from "./Images/redheart.svg"


function SingleRecipeCard(props) {

    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);

    const [heartIsRed, setHeartIsRed] = useState(false)

    useEffect(() => {
        const checkIfRecipeIsSaved = async () => {
            const response = await foodAPIClient.checkRecipe(props.id)
            setHeartIsRed(response.data)
        }
        checkIfRecipeIsSaved()
    }, [])

    const changeUserRecipes = async (recipe) => {
        const response = await foodAPIClient.getUserRecipes()
        props.changeSavedRecipes(response.data)
        return response.data
    }

    const [lgShow, setLgShow] = useState(false);

    function handleClickedRecipe() {

        heartIsRed ? setHeartIsRed(false) : setHeartIsRed(true)

        const recipeParams = {
            title: props.title,
            id: props.id,
            imgUrl: props.imgUrl
        }
        saveRecipeToDatabase(recipeParams)
        changeUserRecipes()
    }

    async function handleCardClick() {
        const response = await foodAPIClient.getFullRecipe(props.id)
        const recipeInfo = response.data
        const ingredientsList = recipeInfo.extendedIngredients.map((ingredient) => {
            return ingredient.original
        })

        const ingredientsImages = recipeInfo.extendedIngredients.map((ingredient) => {
            return [ingredient.image, ingredient.amount + " " + ingredient.unit]
        })

        const ingredientsValues = recipeInfo.extendedIngredients.map((ingredient) => {
            return [ingredient.name, ingredient.amount, ingredient.unit]
        })

        props.changeCurrentRecipe({
            title: recipeInfo.title,
            ingredients: ingredientsList,
            instructions: recipeInfo.instructions,
            image: recipeInfo.image,
            ingredientsImages: ingredientsImages,
            ingredientsValues: ingredientsValues
        })
        setLgShow(true)
    }

    async function saveRecipeToDatabase(params) {
        foodAPIClient.addRecipe({
            title: params.title,
            id: params.id,
            imageUrl: params.imgUrl
        });
    }

    return (

        <>
            <Card className='recipe-card' style={{ width: '18rem' }}>
                <Card.Img onClick={handleCardClick} variant="top" src={props.imgUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        <Heart className={heartIsRed ? "d-none" : "d-block"}
                            onClick={handleClickedRecipe}
                        />
                        <Redheart className={heartIsRed ? "d-block" : "d-none"}
                            onClick={handleClickedRecipe}
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
            <RecipeModal
                ingredient={props.ingredient}
                changeIngredient={props.changeIngredient}
                searchBarValues={props.searchBarValues}
                changeSearchBarValues={props.changeSearchBarValues}
                currentRecipe={props.currentRecipe}
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            />
        </>
    )
}

export default SingleRecipeCard