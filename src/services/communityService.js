import NetService from "./netService";

export default class CommunityService extends NetService {
    addCommunityPost(data) {
        return this.post('post', data);
    }

    getCommunityPosts() {
        return this.get('posts');
    }

    getCommentsForPost(postId) {
        return this.get(`comments/${postId}`);
    }

    addCommentToPost(postId, data) {
        return this.post(`comment/${postId}`, data);
    }

    getCommentById(CommentId) {
        return this.get(`comment/${CommentId}`);
    }

    getPostById(postId) {
        return this.get(`post/${postId}`);
    }
}