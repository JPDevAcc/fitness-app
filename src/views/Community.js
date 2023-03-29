import './css/Community.scss'
import CommunityPosts from '../components/CommunityPosts'
import AddPostModal from '../components/AddPostModal.component'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import CommunityService from '../services/communityService'


function Community(props) {

    const [posts, changePosts] = useState([])

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
        return response
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const data = e.target[0].value
        findUser(data)

        console.log(data)
    }

    return (
        <>
            <Row className='community-container'>
                <Col lg={4} className='community-left-panel'>
                    <div className='community-left-panel-wrapper'>
                        <Button onClick={addPostHandler} variant="primary" size="lg"> Create Post </Button>
                        <br />
                        <br />
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Search for users..." />
                            </Form.Group>
                            <Button variant="primary" type="submit">Search</Button>
                        </Form>
                    </div>
                    <AddPostModal
                        show={show}
                        handleClose={() => setShow(false)}
                        posts={posts}
                        changePosts={changePosts}
                        viewCommon={props.viewCommon}

                    />
                </Col>
                <Col lg={8} className='community-right-panel'>

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
                </Col>
            </Row>
        </>
    )
}

export default Community