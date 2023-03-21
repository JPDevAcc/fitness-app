import "./css/Exercises.scss"
import SingleWorkoutCard from '../components/singleWorkoutCard.component'


function Exercises(props) {
    return (
        <SingleWorkoutCard
            viewCommon={props.viewCommon}
        />
    )
}

export default Exercises