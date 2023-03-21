import NetService from "./netService";

export default class FoodAPIClient extends NetService {

    getRecipe() {
        return this.get('recipe');
    }

    addRecipe(data) {
        return this.post('addRecipe', data);
    }
}
