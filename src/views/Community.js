import './css/Community.scss'
import CommunityPosts from '../components/CommunityPosts'
import AddPostModal from '../components/AddPostModal.component'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import CommunityService from '../services/communityService'


function Community(props) {

    const [posts, changePosts] = useState([
        {
            // title: 'test',
            // description: 'test',
            // comments: [],
            // likes: 0
        },

    ])

    const communityService = new CommunityService(props.viewCommon.net)

    useEffect(() => {
        communityService.getCommunityPosts()
            .then(response => {
                changePosts(response.data)
            }
            )
            .catch(error => {
                console.log(error)
            }
            )
    }, [])

    const addCommunityPost = async (data) => {
        console.log(`sending data to backend: ${data}`)
        const response = await communityService.addCommunityPost(data)
        // console.log(response.data)
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addPostHandler = () => {
        setShow(true)
    }



    return (
        <>
            <Row className='community-container'>
                <Col lg={4} className='community-left-panel'>
                    <div className='community-left-panel-wrapper'>
                        <Button onClick={addPostHandler} variant="primary" size="lg"> Create Post </Button>
                        {/* <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Search</Form.Label>
                                <Form.Control type="text" placeholder="Search" />
                            </Form.Group>
                        </Form> */}
                    </div>
                    <AddPostModal
                        show={show}
                        handleClose={() => setShow(false)}
                        addCommunityPost={addCommunityPost}
                    />
                </Col>
                <Col lg={8} className='community-right-panel'>

                    <CommunityPosts
                        viewCommon={props.viewCommon}
                        posts={posts}
                    />
                </Col>

            </Row>
        </>
    )
}

export default Community