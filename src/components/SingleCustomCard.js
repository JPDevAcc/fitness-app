import './css/CustomWorkoutCard.scss'
import { Card, Button } from 'react-bootstrap'
import { formatDate, formatMonth, formatTime } from '../utils/utils'

function SingleCustomCard(props) {

    return (
        <>
            <Card className='custom-card' style={{ width: '18rem' }}>
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