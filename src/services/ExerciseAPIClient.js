import NetService from "./netService";

export default class ExerciseAPIClient extends NetService {
  getBodyparts() {
    return this.get("bodyparts");
  }

  getExercise(bodypart) {
    return this.get(`exercises/bodyPart/${bodypart}`);
  }
}
