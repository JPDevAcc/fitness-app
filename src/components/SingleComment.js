import '../views/css/Comment.scss'
import { Card } from 'react-bootstrap'
import { formatTime, formatMonth } from '../utils/utils'

function SingleComment(props) {

    console.log(props.comment._id)
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.comment.username}</Card.Title>
                <Card.Text>
                    {props.comment.text}
                    <br />
                    {formatTime(props.comment.date)}
                    {" "}
                    {formatMonth(props.comment.date)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SingleComment