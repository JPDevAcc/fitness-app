import './css/Community.scss'
import CommunityPosts from '../components/CommunityPosts'
import AddPostModal from '../components/AddPostModal.component'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import CommunityService from '../services/communityService'
import { getProfileImageUrl } from '../utils/image'
import { ReactComponent as Message } from './images/message.svg'
import { ReactComponent as Add } from './images/plus.svg'

function Community(props) {

    const [posts, changePosts] = useState([])
    const [user, changeUser] = useState(null)

    const communityService = new CommunityService(props.viewCommon.net)

    useEffect(() => {
        communityService.getCommunityPosts()
            .then(response => {
                changePosts(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addPostHandler = () => {
        setShow(true)
    }

    const findUser = async (data) => {
        const response = await communityService.findUser(data)
        console.log(response)
        return response.data
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const data = e.target[0].value
        const userData = await findUser(data)
        const userProfile = await userData.userProfile
        console.log(userProfile)
        changeUser(userProfile)
    }

    const displayUsercard = (user = null) => {
        if (user) {
            const url = getProfileImageUrl(user.imageUrl)
            return (
                <Card className='user-card' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={url} />
                    <Card.Body>
                        <Card.Title>{user.userName}</Card.Title>
                        <Card.Text>
                            {user.bio}
                        </Card.Text>
                        <div className='icons'>
                            <Message className='message-icon' />
                            <Add className='add-icon' />
                        </div>
                    </Card.Body>
                </Card>
            )
        }
    }

    return (
        <>
            <Row className='community-container'>
                <Col lg={5} className='community-left-panel'>
                    <div className='community-left-panel-wrapper'>
                        <Button onClick={addPostHandler} variant="primary" size="lg"> Create Post </Button>
                        <br />
                        <Form className='form-search' onSubmit={submitHandler}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Search for users..." />
                            </Form.Group>
                            <Button className='search-btn' variant="primary" type="submit">Search</Button>
                        </Form>
                        {displayUsercard(user)}
                    </div>
                    <AddPostModal
                        show={show}
                        handleClose={() => setShow(false)}
                        posts={posts}
                        changePosts={changePosts}
                        viewCommon={props.viewCommon}

                    />
                </Col>
                <Col lg={6} >
                    <div className='community-right-panel'>

                        <CommunityPosts
                            viewCommon={props.viewCommon}
                            posts={posts}
                            changeCurrentPost={props.changeCurrentPost}
                            counters={props.counters}
                            changeCounters={props.changeCounters}
                            updateLikes={props.updateLikes}
                            updateLols={props.updateLols}
                            updateComments={props.updateComments}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Community