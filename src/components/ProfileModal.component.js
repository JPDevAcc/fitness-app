
import { Modal, Button } from 'react-bootstrap'

function ProfileModal(props) {

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
                        User Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal>
        </>
    )
}

export default ProfileModal