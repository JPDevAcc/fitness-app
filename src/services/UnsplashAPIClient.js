import NetService from "./netService";

export default class UnsplashAPIClient extends NetService {



    getPics() {
        return this.get('unsplash');
    }
}