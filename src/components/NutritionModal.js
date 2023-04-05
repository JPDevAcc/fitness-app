import "./css/nutritionModal.scss";

import { Modal, Row, Col, Table } from 'react-bootstrap'

function NutritionModal(props) {

    return (
        <>
            <Modal
                className='nutrition-modal'
                ingredient={props.ingredient}
                nutrition={props.nutrition}
                show={props.show}
                onHide={() => props.onHide(false)}
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Nutrients in {props.ingredient.amount} {(props.ingredient.unit === "unit") ? "" : props.ingredient.unit + " of "} {props.ingredient.name}:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="nutrition-wrapper" lg={5}>
                            <Table className="table-nutrients" striped bordered hover>
                                <thead>
                                    <tr className="top-table">
                                        <th>Nutrient</th>
                                        <th>Amount</th>
                                        <th>Unit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.nutrition.map((nutrient, index) => {
                                        return (
                                            <tr key={index}>
                                                <th >{nutrient.name}</th>
                                                <th>{nutrient.amount}</th>
                                                <th>{nutrient.unit}</th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NutritionModal