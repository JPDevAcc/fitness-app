import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import waterImage from "./Images/Water.jpg";

function WaterIntakeChallenge() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [daysLeft, setDaysLeft] = useState(30);
  const [goal, setGoal] = useState(8); // starting goal: 8 cups
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleStart = () => {
    setIsActive(true);
    setTimer(
      setInterval(() => {
        setWaterIntake(waterIntake + 0.25);
      }, 900000)
    ); // 900000 milliseconds = 15 minutes
  };

  const handlePause = () => {
    setIsActive(false);
    clearInterval(timer);
  };

  const handleReset = () => {
    setWaterIntake(0);
  };

  const handleAddCup = () => {
    setWaterIntake(waterIntake + 1);
  };

  const calculateGoal = () => {
    // Calculate daily water intake goal based on weight and activity level
    // This is just a simple example using a fixed goal of 8 cups
    return goal;
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={waterImage}
        style={{ width: "300px", height: "auto", margin: "0 auto" }}
      />

      <Card.Header>
        <h2>Water Intake Challenge</h2>
      </Card.Header>
      <Card.Body>
        <div>
          <p>Day {31 - daysLeft} of 30</p>
          <p>Goal for today: {calculateGoal()} cups</p>
          <p>Water intake so far: {waterIntake.toFixed(2)} cups</p>
          {daysLeft > 0 ? (
            <>
              <Button onClick={handleAddCup} disabled={!isActive}>
                Add 1 Cup
              </Button>
              <Button onClick={handleStart} disabled={isActive}>
                Start Drinking
              </Button>
              <Button onClick={handlePause} disabled={!isActive}>
                Pause Drinking
              </Button>
              <Button onClick={handleReset} disabled={waterIntake === 0}>
                Reset
              </Button>
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

export default WaterIntakeChallenge;
