import WalkRunChallenge from "../components/WalkRunChallenge";
import PlankChallenge from "../components/PlankChallenge";
import WaterIntakeChallenge from "../components/WaterIntakeChallenge";
import "./css/challenge.scss"

const Challenge = () => {

return (
    
  <div className="challenge-card">
    <div>Challenge</div>
    <WaterIntakeChallenge className="water" />
    <WalkRunChallenge className="walkrun" />
    <PlankChallenge className="plank" />
  </div>
);
}
export default Challenge;
