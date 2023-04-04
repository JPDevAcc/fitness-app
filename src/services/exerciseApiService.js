import NetService from "./netService";

export default class ExerciseAPIClient extends NetService {
  getBodyparts() {
    return this.get("bodyparts");
  }

  getExercise(bodypart) {
    return this.get(`exercises/bodyPart/${bodypart}`);
  }

  addCustomWorkout(customWorkout) {
    return this.post("customWorkout", customWorkout);
  }

  getCustomWorkouts() {
    return this.get("customWorkouts");
  }

  getCustomWorkoutForUser() {
    return this.get("customforuser");
  }
}
