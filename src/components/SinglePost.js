import './css/communityPosts.scss'
import { Card, Button } from 'react-bootstrap'

function SinglePost(props) {

    // console.log(props.post)
    return (
        <>
            <Card className='post-card' style={{ width: '18rem' }}>
                <Card.Body className='post-card-body'>
                    <Card.Title>{props.post.title}</Card.Title>
                    <Card.Text>
                        {props.post.description}
                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}

export default SinglePost