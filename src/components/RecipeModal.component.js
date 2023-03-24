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
            {props.currentRecipe.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="ingredients" lg={5}>
              <ul>
                {props.currentRecipe.ingredients.map((ingredient) => {
                  return (
                    <li key={Math.random()} >{ingredient}</li>
                  )
                })}
              </ul>
            </Col>
            <Col lg={6}>
              <img className="img-modal-recipe" src={props.currentRecipe.image} alt="" />
            </Col>
          </Row>
          <Row>
            {props.currentRecipe.instructions}
          </Row>
          <Row>
            {props.currentRecipe.ingredientsImages.map((image) => {
              return (
                <div
                  key={Math.random()}
                  className="ingredient-wrapper">
                  <img className="img-ingredient" src={`https://spoonacular.com/cdn/ingredients_100x100/${image[0]}`} alt="" />
                  <label>{image[1]}</label>
                </div>
              )
            })}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RecipeModal