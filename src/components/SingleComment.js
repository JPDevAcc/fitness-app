import '../views/css/Comment.scss'
import { Card } from 'react-bootstrap'
import { formatTime, formatMonth } from '../utils/utils'
import { getProfileImageUrl } from '../utils/image'

function SingleComment(props) {

    const url = getProfileImageUrl(props.comment.profileImg)

    return (
        <Card className='comment-card' style={{ width: '18rem' }}>
            <img className='comment-card-image' src={url}></img>
            <Card.Body>
                <Card.Title>
                    <span className='username'>{props.comment.username}</span>
                    {" "}
                    <span className='time'>{formatTime(props.comment.date)}</span>
                    {" "}
                    <span className='date'>{formatMonth(props.comment.date)}</span>
                </Card.Title>
                <Card.Text>
                    {props.comment.text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SingleComment