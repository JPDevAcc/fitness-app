import "../components/css/RecipeCard.scss"
import SingleRecipeCard from '../components/SingleRecipeCard'
import FoodAPIClient from "../services/FoodApiClient";
import { Button, Col, Row, Form } from 'react-bootstrap'
// import { Form } from "react-bootstrap";
import { useEffect } from 'react';

function Recipes(props) {

    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);

    async function getRecipes(data) {
        const response = await foodAPIClient.getRecipe(data);
        console.log(response)

        return props.changeRecipes(response.data.results)

    }

    useEffect(() => {
        props.netService.get('allrecipes')
            .then(response => {
                props.changeRecipes(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    const showRecipes = props.recipes.map((recipe) => {

        // THE MOST CLEVER LINE OF CODE I HAVE EVER WRITTEN  // DIFFERENT API'S HAVE DIFFERENT KEY NAMES FOR THE SAME THING // 
        if (!recipe.image) { recipe.image = recipe.imageUrl }
        return (
            <SingleRecipeCard
                key={recipe.id}
                title={recipe.title}
                id={recipe.id}
                imgUrl={recipe.image}
                viewCommon={props.viewCommon}
                currentRecipe={props.currentRecipe}
                changeCurrentRecipe={(currentRecipe) => props.changeCurrentRecipe(currentRecipe)}
                saveRecipeToDatabase={(params) => saveRecipeToDatabase(params)}
            />

        )
    })


    async function saveRecipeToDatabase(params) {
        foodAPIClient.addRecipe({
            title: params.title,
            id: params.id,
            imageUrl: params.imgUrl
        });
    }

    function submitHandlerRecipe(event) {
        const data = event.target[0].value;
        console.log(data)
        event.preventDefault();

        try {
            getRecipes(data);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Row lg={12} className="the-row">
                <Col lg={3} md={12} className="search-column search-one">
                    <Form onSubmit={submitHandlerRecipe} >
                        <Form.Group >
                            {/* <Form.Label>Search for a recipe</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter name of food" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Fetch recipes!</Button>
                    </Form>
                </Col>
                <Col lg={9} md={12} className="search-column">
                    <div className="recipe-wrapper">
                        {showRecipes}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Recipes