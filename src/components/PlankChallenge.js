import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import plankImage from "./Images/plank.png";

function PlankChallenge() {
  const [seconds, setSeconds] = useState(0);
  const [daysLeft, setDaysLeft] = useState(30);
  const [goal, setGoal] = useState(10); // starting goal: 10 seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      if (timeLeft > 0) {
        setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        setIsActive(false);
        setSeconds(seconds + 1);
        if (seconds >= goal) {
          setGoal(goal + 5); // increase goal by 5 seconds every time it's met
        }
        setDaysLeft(daysLeft - 1);
        setTimeLeft(0);
      }
    }
  }, [isActive, timeLeft, seconds, goal, daysLeft]);

  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(10);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(0);
    setSeconds(0);
    setDaysLeft(30);
    setGoal(10);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="text-center">
      <Card.Img
        variant="top"
        src={plankImage}
        style={{ width: "510px", height: "auto" }}
      />
      <Card.Header>
        <h2>30-Day Plank Challenge</h2>
      </Card.Header>

      <Card.Body>
        <div>
          <p>Day {31 - daysLeft} of 30</p>
          <p>Goal for today: {formatTime(goal)} seconds</p>
          {daysLeft > 0 ? (
            <>
              <Button onClick={handleStart} disabled={isActive}>
                Start Plank
              </Button>
              <Button onClick={handleStop} disabled={!isActive}>
                Reset
              </Button>
              <h2 disabled>{timeLeft}</h2>
            </>
          ) : (
            <p>Congratulations, you completed the challenge!</p>
          )}
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">You Can Do it</Card.Footer>
    </Card>
  );
}

export default PlankChallenge;
