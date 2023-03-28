import './css/PostPage.scss'
import { useState, useEffect } from 'react'
import { ReactComponent as Heart } from './images/redheart.svg'
import { ReactComponent as Comments } from './images/comments.svg'
import { ReactComponent as LolFace } from './images/lol2.svg'
import { Card, Button, Col, Row } from 'react-bootstrap';
import SingleComment from '../components/SingleComment'
import CommunityService from '../services/communityService'
import { formatTime, formatMonth } from '../utils/utils'

function PostPage(props) {

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




    console.log(props.currentPost.date)
    return (
        <>
            <Row className='post-page-container'>
                <Col lg={5} className='post-page-left-panel'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Text>
                                <img className='post-page-user-image' src='https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='user image' />
                                <span className='username'>Username</span>
                                {formatTime(props.currentPost.date)}
                                {" "}
                                {formatMonth(props.currentPost.date)}
                            </Card.Text>
                            <Card.Img variant="top" src={props.currentPost.imageUrl} />
                            <Card.Title>{props.currentPost.title}</Card.Title>
                            <Card.Text>
                                {props.currentPost.description}
                            </Card.Text>
                            <div className='post-page-icons'>
                                <Heart className='heart' />
                                <span>0 </span><span> </span>
                                <LolFace className='lol' />
                                <span>0 </span><span> </span>
                                <Comments className='comments' />
                                <span>0 </span><span> </span>
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
                <Col lg={4} className='post-page-right-panel'>
                    {showComments()}
                </Col>
            </Row>
        </>
    )
}

export default PostPage