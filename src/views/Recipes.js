import "../components/css/RecipeCard.scss"
import SingleRecipeCard from '../components/SingleRecipeCard'
import FoodAPIClient from "../services/FoodApiClient";
import { Button, Col, Row } from 'react-bootstrap'

function Recipes(props) {

    const foodAPIClient = new FoodAPIClient(props.viewCommon.net);

    async function getRecipes() {
        const response = await foodAPIClient.getRecipe();
        console.log(response)

        return props.changeRecipes(response.data.results)

    }

    const showRecipes = props.recipes.map((recipe) => {
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

    return (
        <>
            <Row lg={12}>
                <Col lg={4} className="search-column">
                    <Button onClick={getRecipes} variant="primary">Fetch Pasta!</Button>
                </Col>
                <Col lg={8} className="search-column">
                    <div className="recipe-wrapper">
                        <p>
                            ipssfhuiekrugawgkauwflhgaeghuiaglhbuistgd


                        </p>
                        {showRecipes}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Recipes