import { Modal, Button } from 'react-bootstrap'

function ErrorModal(props) {

    return (

        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ooops...</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.errorMessage} !</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default ErrorModal