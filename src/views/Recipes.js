import "../components/css/RecipeCard.scss"
import SingleRecipeCard from '../components/SingleRecipeCard'
import FoodAPIClient from "../services/FoodApiClient"
import { Button, Col, Row, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import NutritionModal from '../components/NutritionModal.component'


function Recipes(props) {
    const [lgShow, setLgShow] = useState(false);
    const [nutrition, changeNutrition] = useState([{
        name: "Calcium",
        amount: "1",
        unit: "mg",
    }]);

    const [ingredient, changeIngredient] = useState({
        name: "Milk",
        amount: 0,
        unit: "g",
    });

    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);

    async function getRecipes(data) {
        const response = await foodAPIClient.getRecipe(data);

        return props.changeRecipes(response.data.results)
    }

    useEffect(() => {
        props.netService.get('allrecipes')
            .then(response => {
                props.changeRecipes(response.data)
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
                isRedHeart={props.isRedHeart}
                changeIsRedHeart={(isRedHeart) => props.changeIsRedHeart(isRedHeart)}
                savedRecipes={props.savedRecipes}
                changeSavedRecipes={(savedRecipes) => props.changeSavedRecipes(savedRecipes)}
                searchBarValues={props.searchBarValues}
                changeSearchBarValues={props.changeSearchBarValues}
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
        event.preventDefault();

        try {
            getRecipes(data);

        } catch (error) {
            console.log(error)
        }
    }

    const getNutrition = async (data, amount, unit) => {
        const response = await foodAPIClient.getIngredientInfo(data, amount, unit);
        return response.data
    }

    const getID = async (data) => {
        const response = await foodAPIClient.getIngredientID(data);
        return response.data.results[0].id
    }

    async function sunbmitHandlerNutrition(event) {
        event.preventDefault();

        const data = event.target[0].value;
        const amount = event.target[1].value;
        const unit = event.target[2].value;
        const id = await getID(data);

        try {
            const nutrition = await getNutrition(id, amount, unit);
            console.log(nutrition)
            changeNutrition(nutrition.nutrition.nutrients)
            changeIngredient({
                name: data,
                amount: amount,
                unit: unit,
            })

            setLgShow(true);

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
                            <Form.Control type="text" placeholder="Enter name of food" />
                        </Form.Group>
                        <br />
                        <Button className="btn-orange" variant="primary" type="submit">Fetch recipes!</Button>
                    </Form>

                    <br />
                    <br />
                    <br />
                    <Form onSubmit={sunbmitHandlerNutrition}>
                        <Form.Group >
                            <Form.Control defaultValue={props.searchBarValues.ingredient} id="name" type="text" placeholder="Enter ingredient name" />
                        </Form.Group>
                        <br />
                        <Form.Group >
                            <Form.Control defaultValue={props.searchBarValues.amount} id="amount" type="text" placeholder="Enter amount" />
                        </Form.Group>
                        <br />
                        <Form.Group >
                            <Form.Control defaultValue={props.searchBarValues.unit} id="unit" type="text" placeholder="Enter weight unit" />
                        </Form.Group>
                        <br />
                        <Button className="btn-orange" variant="primary" type="submit">Fetch nutrition!</Button>
                    </Form>
                    <NutritionModal
                        ingredient={ingredient}
                        nutrition={nutrition}
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    />
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