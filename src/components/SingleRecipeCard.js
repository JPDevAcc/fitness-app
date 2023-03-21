import "./css/RecipeCard.scss"
import React from 'react'
import { Card, Button } from 'react-bootstrap'


function SingleRecipeCard(props) {

    function handleClickedRecipe() {
        const recipeParams = {
            title: props.title,
            id: props.id,
            imgUrl: props.imgUrl
        }
        props.saveRecipeToDatabase(recipeParams)
        alert("Recipe Saved!")
    }

    return (

        <>
            <Card className='recipe-card' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imgUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.id}
                    </Card.Text>
                    <Button onClick={handleClickedRecipe} variant="primary">Save</Button>

                </Card.Body>
            </Card>
        </>

    )
}

export default SingleRecipeCard