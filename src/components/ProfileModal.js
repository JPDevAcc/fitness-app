import './css/profileModal.scss'
import { Row, Col } from 'react-bootstrap'
import { Modal, Button } from 'react-bootstrap'
import { getFullUrl } from '../utils/image'

function ProfileModal(props) {

    let url = getFullUrl(props.userProfile?.imageUrl)

    if (!props.userProfile?.imageUrl) url = 'https://images.unsplash.com/photo-1640952131659-49a06dd90ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

    return (
        <>
            <Modal
                size="lg"
                show={props.show}
                onHide={() => props.onHide(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {props.userProfile?.userName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='profile-wrapper'>
                        <Row className='profile-info'>
                            <Col className='profile-img-wrapper' lg={12}>
                                <img className='profile-img' src={url} />
                            </Col>
                            <Col className='profile-info-text'>
                                <p>{props.userProfile?.bio}</p>
                                <p>Age: {" "}
                                    {props.userProfile?.agePrivacy === "pub" ? props.userProfile?.age : "hidden"}
                                </p>
                                <p>Diet: {" "}
                                    {props.userProfile?.dietTypePrivacy === "pub" ? props.userProfile?.dietType : "hidden"}
                                    {" "}
                                    {props.userProfile?.dietPracticePrivacy === "pub" ? props.userProfile?.dietPractice : "hidden"}
                                </p>

                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProfileModal