import "./css/RecipeCard.scss";

import { Modal, Row, Col } from 'react-bootstrap'

function RecipeModal(props) {

    return (
        <>
            <Modal
                className='recipe-modal'
                {...props}
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Nutrients in {props.ingredient.amount} {props.ingredient.unit} of {props.ingredient.name}:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="ingredients" lg={5}>
                            <ul>
                                {props.nutrition.map((nutrient) => {
                                    return (
                                        <li key={Math.random()} >{nutrient.name} {nutrient.amount} {nutrient.unit}</li>
                                    )
                                })}
                            </ul>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RecipeModal