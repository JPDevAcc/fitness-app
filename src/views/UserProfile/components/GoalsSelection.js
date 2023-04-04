import "./goalsSelection.scss";
import { useMemo, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import RemovableTile from "../../../components/RemovableTile";
import Select from "../../../components/Select";

export default function GoalsSelection({goalOpts, selectedGoalIds, goalIdsToTitle, handleAddGoal, handleRemoveGoal}) {
	
	const [selectedGoalId, changeSelectedGoalId] = useState("") ;

	const goalIdsRemain = useMemo(() => goalOpts.filter(opt => !selectedGoalIds.includes(opt.value)), [goalOpts, selectedGoalIds]);

	function buildOptions() {
		return selectedGoalIds.map((goalId =>
			<div key={goalId} className="mx-auto">
				<RemovableTile id={goalId} title={goalIdsToTitle[goalId]} image={"images/goalTiles/" + goalId + ".avif"} handleRemove={handleRemoveGoal} />
			</div>
		))
	}

	function handleAddGoalInternal() {
		const oldGoalId = selectedGoalId ;
		changeSelectedGoalId("") ;
		handleAddGoal(oldGoalId) ;
	}

	// Template
  return (
		<div className="component-goals">
			<Row className="gap-3">
				<Col className="d-flex">
					<Select id='goals' disabled={goalIdsRemain.length === 1} opts={goalIdsRemain} onChange={(e) => changeSelectedGoalId(e.target.value)} value={selectedGoalId}	/>
					<Button
						variant="outline-primary" disabled={selectedGoalId === ""} 
						onClick={() => handleAddGoalInternal(document.getElementById('goals').value)}>Add</Button>
				</Col>
			</Row>

			<div className="d-flex gap-3 flex-wrap justify-content-between">
				{buildOptions()}
			</div>
		</div>
  );
}