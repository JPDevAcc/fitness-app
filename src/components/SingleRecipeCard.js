import "./css/RecipeCard.scss"
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useState } from 'react';
import RecipeModal from './RecipeModal.component';
import FoodAPIClient from "../services/FoodApiClient";
import { ReactComponent as Heart } from "./Images/heart.svg"
import { ReactComponent as Redheart } from "./Images/redheart.svg"


function SingleRecipeCard(props) {
    const [lgShow, setLgShow] = useState(false);
    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);

    function handleClickedRecipe() {
        const recipeParams = {
            title: props.title,
            id: props.id,
            imgUrl: props.imgUrl
        }
        props.saveRecipeToDatabase(recipeParams)
        alert("Recipe Saved!")
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


        console.log(ingredientsList)
        console.log(ingredientsImages)

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
            <Card onClick={handleCardClick} className='recipe-card' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imgUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        <Heart
                            onClick={handleClickedRecipe}
                        />
                        <Redheart />
                    </Card.Text>
                    {/* <Button onClick={handleClickedRecipe} variant="primary">Save</Button> */}

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