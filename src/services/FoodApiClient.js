import NetService from "./netService";

export default class FoodAPIClient extends NetService {

    getRecipe(data) {
        return this.get(`recipe/${data}`);
    }

    addRecipe(data) {
        return this.post('addRecipe', data);
    }
}
