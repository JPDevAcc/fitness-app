import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ExerciseAPIClient from "../services/ExerciseAPIClient";
import "./css/SingleWorkoutCard.css";
import logo from "./Images/logo.png";
import top from "./Images/top.png";
import WorkoutCard from "./WorkoutCard";

function SingleWorkoutCard(props) {
  const exerciseAPIClient = new ExerciseAPIClient(props.viewCommon.net);

  const [bodyparts, setBodyparts] = useState(null);
  const [worksoutsForBodyPart, setWorksoutsForBodyPart] = useState(null);
  const [numToShow, setNumToShow] = useState(10);

  useEffect(() => {
    async function getBodyparts() {
      const response = await exerciseAPIClient.getBodyparts();
      setBodyparts(response.data || []);
    }
    getBodyparts();
  }, []);

  useEffect(() => {
    setNumToShow(10);
  }, [worksoutsForBodyPart]);

  const handleCardClick = async (bp) => {
    const response = await exerciseAPIClient.getExercise(bp);

    console.log(response);
    setWorksoutsForBodyPart(response.data);
  };

  const handleLoadMore = () => {
    setNumToShow(numToShow + 10);
  };

  return (
    <div className="wrapper">
      <div className="card-container">
        {bodyparts ? (
          bodyparts.map((bp) => (
            <Card
              key={bp}
              className="card"
              onClick={() => handleCardClick(bp)}
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title className="card-title">
                  <img src={logo} alt="Logo" className="logo" />
                  <h2>{props.name}</h2>
                </Card.Title>
                <Card.Text>{bp}</Card.Text>
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

      {worksoutsForBodyPart && (
        <div className="card-container">
          {worksoutsForBodyPart.slice(0, numToShow).map((exercise) => {
            return (
              <WorkoutCard
                key={exercise.id}
                title={exercise.name}
                imgUrl={exercise.gifUrl}
                equiment={exercise.equipment}
                part={exercise.bodyPart}
                target={exercise.target}
              />
            );
          })}
        </div>
      )}

      {worksoutsForBodyPart && numToShow >= 20 && (
        <button
          className="scroll-to-top-btn"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={top} className="top" />
        </button>
      )}

      {worksoutsForBodyPart && numToShow < worksoutsForBodyPart.length && (
        <Button
          className="load-more-btn"
          variant="primary"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </div>
  );
}

export default SingleWorkoutCard;
