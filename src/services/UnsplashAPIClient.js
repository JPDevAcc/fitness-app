import NetService from "./netService";

export default class UnsplashAPIClient extends NetService {

    getPics() {
        return this.get('unsplash');
    }

    addPicture(data) {
        return this.post('addPicture', data);
    }
}