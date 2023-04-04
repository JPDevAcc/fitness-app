import NetService from "./netService";

export default class FoodAPIClient extends NetService {

    getRecipe(data) {
        return this.get(`recipe/${data}`);
    }

    addRecipe(data) {
        return this.post('addRecipe', data);
    }

    getFullRecipe(data) {
        return this.get(`fullrecipe/${data}`);
    }

    getIngredientInfo(data, amount, unit) {
        return this.get(`ingredient/${data}/${amount}/${unit}`);
    }

    getIngredientID(data) {
        return this.get(`ingredient/${data}`);
    }

    getUserRecipes() {
        return this.get('userrecipes');
    }

    checkRecipe(data) {
        return this.get(`checkrecipe/${data}`);
    }
}
