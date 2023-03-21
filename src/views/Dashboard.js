import React from 'react'
import { Button } from 'react-bootstrap'
import UnsplashAPIClient from '../services/UnsplashAPIClient'
import Recipes from '../components/Recipes';
import { useState } from 'react';

export default function Dashboard(props) {

    const [currentRecipe, changeCurrentRecipe] = useState(
        {
            "title": "Card Title",
            "id": "Some quick example text to build on the card title and make up the bulk of the card's content.",
            "imgUrl": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        })

    const [recipes, changeRecipes] = useState([]);


    const unsplashAPIClient = new UnsplashAPIClient(props.viewCommon.net);

    async function getPictures() {
        const response = await unsplashAPIClient.getPics();
        console.log(response);
    }

    return (

        <>
            <Recipes
                viewCommon={props.viewCommon}
                recipes={recipes}
                changeRecipes={(recipes) => changeRecipes(recipes)}
                currentRecipe={currentRecipe}
                changeCurrentRecipe={(currentRecipe) => changeCurrentRecipe(currentRecipe)} />
        </>

    )
}