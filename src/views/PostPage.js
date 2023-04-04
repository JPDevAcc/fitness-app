import './css/_postPage.scss'
import { useState, useEffect } from 'react'
import { ReactComponent as Heart } from './images/redheart.svg'
import { ReactComponent as Comments } from './images/comments.svg'
import { ReactComponent as LolFace } from './images/lol2.svg'
import { Card, Button, Col, Row } from 'react-bootstrap';
import SingleComment from '../components/SingleComment'
import CommunityService from '../services/communityService'
import { formatTime, formatMonth } from '../utils/utils'
import { getProfileImageUrl } from '../utils/image'

function PostPage(props) {

    const url = getProfileImageUrl(props.currentPost.profileImg)

    const updateLikes = async () => {
        const response = await communityService.getLikesCount(props.currentPost._id)
        const likes = await response.data
        props.changeLikeCounter(likes)

    }

    const updateLols = async () => {
        const response = await communityService.getLolsCount(props.currentPost._id)
        const lols = await response.data
        props.changeLolCounter(lols)
    }

    const updateComments = async () => {
        const response = await communityService.getCommentCount(props.currentPost._id)
        const comments = await response.data
        props.changeCommentCounter(comments)
    }

    useEffect(() => {
        updateLikes()
        updateLols()
        updateComments()

    }, [])

    const likePost = async () => {
        const response = await communityService.addLikeToPost(props.currentPost._id)

        if (response.status === 200) {
            updateLikes()
        }
    }

    const lolPost = async () => {
        const response = await communityService.addLolToPost(props.currentPost._id)

        if (response.status === 200) {
            updateLols()
        }
    }

    const communityService = new CommunityService(props.viewCommon.net)

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        communityService.getCommentsForPost(props.currentPost._id)
            .then(response => {
                props.changeComments(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const getComment = async (commentId) => {
        const response = await communityService.getCommentById(commentId);
        return response.data;
    }

    const addCommentHandler = async () => {

        const text = document.getElementById('add-comm').value
        setInputValue('')

        try {
            const response = await communityService.addCommentToPost(props.currentPost._id, { text });
            const commentId = response.data;
            const comment = await getComment(commentId)
            props.changeComments([...props.comments, comment]);
            updateComments()
        } catch (error) {
            console.log(error)
        }
    }

    const showComments = () => {
        return props.comments?.map((comment) =>
            <>
                <SingleComment
                    key={comment._id}
                    comment={comment}
                />
            </>
        )
    }

    return (
        <>
            <Row className='post-page-container'>
                <Col lg={6} className='post-page-left-panel'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Text>
                                <img className='post-page-user-image' src={url} alt='' />
                                <span className='username'>{props.currentPost.username}</span>
                                <span className='time'>{formatTime(props.currentPost.date)}</span>
                                {" "}
                                <span className='date'>{formatMonth(props.currentPost.date)}</span>
                            </Card.Text>
                            <Card.Img variant="top" src={props.currentPost.imageUrl} />
                            <Card.Title>{props.currentPost.title}</Card.Title>
                            <Card.Text>
                                {props.currentPost.description}
                            </Card.Text>
                            <div className='post-page-icons'>
                                <Heart onClick={likePost} className='heart' />
                                <span>{props.likeCounter} </span><span> </span>
                                <LolFace onClick={lolPost} className='lol' />
                                <span className='lol'>{props.lolCounter} </span><span> </span>
                                <Comments />
                                <span>{props.commentCounter} </span><span> </span>
                            </div>
                        </Card.Body>
                        <div className='add-comment'>
                            <input
                                id='add-comm'
                                className='comment-input'
                                type='text'
                                placeholder='Add a comment...'
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                        </div>
                        <div className='bottom-wrapper'>
                            <Button onClick={addCommentHandler} className='btn-orange' variant="primary">Comment</Button>
                        </div>
                    </Card>
                </Col>
                <Col lg={6} className='post-page-right-panel'>
                    {showComments()}
                </Col>
            </Row>
        </>
    )
}

export default PostPage