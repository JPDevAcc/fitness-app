import "./css/exercises.scss";
import SingleWorkoutCard from "../components/SingleWorkoutCard";
import WorkoutCard from "../components/WorkoutCard";
import ExerciseAPIClient from "../services/API/exerciseApiService";

function Exercises(props) {
  const exerciseAPIClient = new ExerciseAPIClient(props.viewCommon.net);
  async function getWorkout(bodypart) {
    const response = await exerciseAPIClient.getExercise(bodypart);

    return props.changeExercises(response.data.results);
  }
  const showExercises = props.exercises.map((exercise) => {
    return (
      <WorkoutCard
        key={exercise.id}
        title={exercise.name}
        imgUrl={exercise.gifUrl}
        viewCommon={props.viewCommon}
      />
    );
  });

  return (
    <>
      <SingleWorkoutCard viewCommon={props.viewCommon} />{showExercises}
    </>
  );
}

export default Exercises;
