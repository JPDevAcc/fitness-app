import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ExerciseAPIClient from "../services/ExerciseAPIClient";
import "./css/SingleWorkoutCard.css";

function SingleWorkoutCard(props) {
  const exerciseAPIClient = new ExerciseAPIClient(props.viewCommon.net);

  const [bodyparts, setBodyparts] = useState(null);

  useEffect(() => {
    async function getBodyparts() {
      const response = await exerciseAPIClient.getBodyparts();
      setBodyparts(response.data || []);
    }
    getBodyparts();
  }, []);

  return (
    <div className="card-container">
      {bodyparts ? (
        bodyparts.map((bp) => (
          <Card key={bp} className="card" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="card-title">
                <h2>{props.name}</h2>
              </Card.Title>
              <Card.Text>{bp}</Card.Text>
              <Button variant="primary">{`Go to ${bp}`}</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card className="card" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <h2>{props.name}</h2>
            </Card.Title>
            <Card.Text>No bodyparts found.</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
export default SingleWorkoutCard;
