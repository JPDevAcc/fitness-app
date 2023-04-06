import WalkRunChallenge from "../components/WalkRunChallenge";
import PlankChallenge from "../components/PlankChallenge";
import WaterIntakeChallenge from "../components/WaterIntakeChallenge";
import { Row, Col } from "react-bootstrap";
import "./css/challenge.scss"

const Challenge = () => {

  return (

    <Row className="challenge-wrapper" >
      <Col sm={12} lg={5} className="challenge-card">
        <WaterIntakeChallenge className="water" />
        <WalkRunChallenge className="walkrun" />
        <PlankChallenge className="plank" />
      </Col>
    </Row>
  );
}
export default Challenge;
