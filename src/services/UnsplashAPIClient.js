import NetService from "./netService";

export default class UnsplashAPIClient extends NetService {

    getPics() {
        return this.get('unsplash');
    }

    getSpecPic(query) {
        return this.get(`unsplash/${query}`);
    }

    addPicture(data) {
        return this.post('addPicture', data);
    }
}