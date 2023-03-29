import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import runImage from "./Images/run.jpg";

function WalkRunChallenge() {
  const [distance, setDistance] = useState(3);
  const [daysLeft, setDaysLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [timeCounted, setTimeCounted] = useState(0);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTimeCounted((timeCounted) => timeCounted + 1);
    }, 1000);
  };

  const handlePause = () => {
    setIsActive(false);
    clearInterval(countRef.current);
  };

  const handleReset = () => {
    setTimeCounted(0);
  };

  const handleClick = () => {
    if ((31 - daysLeft) % 3 === 0) {
      setDistance(distance + 1);
    }
    setDaysLeft(daysLeft - 1);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card className="text-center">
      <Card.Img
        variant="top"
        src={runImage}
        style={{ width: "510px", height: "auto" }}
      />
      <Card.Header>
        <h2>Walk/Run Challenge</h2>
      </Card.Header>
      <Card.Body>
        <div>
          <p>
            Day {31 - daysLeft} of 30: Walk/Run {distance} kilometer
          </p>
          <p>Time : {formatTime(timeCounted)}</p>
          {daysLeft > 0 ? (
            <>
              <Button onClick={handleClick} disabled={isActive}>
                Challenge
              </Button>
              <Button onClick={handleStart} disabled={isActive}>
                Start
              </Button>
              <Button onClick={handlePause} disabled={!isActive}>
                Pause
              </Button>
              <Button onClick={handleReset}>Reset Time</Button>
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

export default WalkRunChallenge;
