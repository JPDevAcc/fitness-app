import { Modal, Button, Form } from 'react-bootstrap'
import './css/communityPosts.scss'

export default function AddPostModal(props) {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert('submit')

        const data = {
            title: document.getElementById('exampleForm.ControlInput1').value,
            description: document.getElementById('exampleForm.ControlTextarea1').value,
            imageUrl: document.getElementById('exampleForm.ControlTextarea2').value
        }

        // console.log(data)
        props.addCommunityPost(data)


        props.handleClose();
    }

    return (
        <Modal className='post-modal' show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        {/* <Form.Label>Title</Form.Label> */}
                        <Form.Control type="text" placeholder="Title" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        {/* <Form.Label>Description</Form.Label> */}
                        <Form.Control as="textarea" rows={3} placeholder="Description" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="exampleForm.ControlTextarea2">
                        {/* <Form.Label>Image</Form.Label> */}
                        <Form.Control type="text" placeholder="Image URL" />
                        <br />
                        <Form.Control type="file" placeholder="Image" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button className='btn-orange' variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}