import './css/_customWorkoutCard.scss'
import { Card, Button } from 'react-bootstrap'
import { formatDate, formatMonth, formatTime } from '../utils/utils'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function SingleCustomCard(props) {

    const navigate = useNavigate();

    const showPage = () => {
        navigate(`/custompage`)
        props.changeCurrentCustomWorkout(props.customWorkout)
    }

    return (
        <>
            <Card onClick={showPage} className='custom-card' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.customWorkout.image} />
                <Card.Body>
                    <Card.Title>{props.customWorkout.title}</Card.Title>
                    <Card.Text>
                        {formatDate(props.customWorkout.date)}
                        {"  "}
                        {formatTime(props.customWorkout.date)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleCustomCard