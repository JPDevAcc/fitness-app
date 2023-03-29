import "./css/RecipeCard.scss"
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useState } from 'react';
import RecipeModal from './RecipeModal.component';
import FoodAPIClient from "../services/FoodApiClient";
import { ReactComponent as Heart } from "./Images/heart.svg"
import { ReactComponent as Redheart } from "./Images/redheart.svg"


function SingleRecipeCard(props) {
    const [heartIsRed, setHeartIsRed] = useState(false)

    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);

    const changeUserRecipes = async (recipe) => {
        const response = await foodAPIClient.getUserRecipes()
        console.log(response.data)
        props.changeSavedRecipes(response.data)
        console.log(await props.savedRecipes)
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
        props.saveRecipeToDatabase(recipeParams)
        changeUserRecipes()
        // console.log(props.savedRecipes)
    }

    async function handleCardClick() {
        const response = await foodAPIClient.getFullRecipe(props.id)
        console.log(response.data)
        const recipeInfo = response.data
        const ingredientsList = recipeInfo.extendedIngredients.map((ingredient) => {
            return ingredient.original
        })

        const ingredientsImages = recipeInfo.extendedIngredients.map((ingredient) => {
            return [ingredient.image, ingredient.amount + " " + ingredient.unit]
        })

        props.changeCurrentRecipe({
            title: recipeInfo.title,
            ingredients: ingredientsList,
            instructions: recipeInfo.instructions,
            image: recipeInfo.image,
            ingredientsImages: ingredientsImages,

        })
        setLgShow(true)
    }

    return (

        <>
            <Card className='recipe-card' style={{ width: '18rem' }}>
                <Card.Img onClick={handleCardClick} variant="top" src={props.imgUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        <div className={!heartIsRed ? "d-none" : "d-block"}>
                            <Heart
                                onClick={handleClickedRecipe}
                            />
                        </div>
                        <div className={!heartIsRed ? "d-block" : "d-none"}>
                            <Redheart
                                onClick={handleClickedRecipe}
                            />
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <RecipeModal

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