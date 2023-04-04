import './css/profileModal.scss'
import { Row, Col } from 'react-bootstrap'
import { Modal, Button } from 'react-bootstrap'
import { getFullUrl } from '../utils/image'

function ProfileModal(props) {

    const url = getFullUrl(props.userProfile?.imageUrl)
    // console.log(props.userProfile)

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