import NetService from "./netService";

export default class CommunityService extends NetService {
    addCommunityPost(data) {
        return this.post('post', data);
    }

    getCommunityPosts() {
        return this.get('posts');
    }
}