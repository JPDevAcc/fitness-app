import './css/customWorkoutCard.scss'
import { Card, Button } from 'react-bootstrap'
import { formatDate, formatMonth, formatTime } from '../utils/utils'
import logo from "./Images/logo.png"
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
                    <Card.Title className='t-center'>{props.customWorkout.title}</Card.Title>
                    <Card.Text className='bottom-wrapper'>
                        <span className='date'>
                            {formatDate(props.customWorkout.date)}
                        </span>
                        {"  "}
                        <img
                            src={logo}
                            alt="Logo"
                            className="logo"
                        />
                        <span className='time'>
                            {formatTime(props.customWorkout.date)}
                        </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleCustomCard