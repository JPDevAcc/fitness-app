import './css/communityPosts.scss'
import { Card, Button } from 'react-bootstrap'
import { ReactComponent as Heart } from "./Images/redheart.svg"
import { ReactComponent as Comments } from "./Images/comments.svg"
import { ReactComponent as LolFace } from "./Images/lol2.svg"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ProfileModal from './ProfileModal.component';


function SinglePost(props) {

    const [lgShow, setLgShow] = useState(false);

    const navigate = useNavigate();

    const navigateToPostView = () => {
        props.changeCurrentPost(props.post)
        navigate(`/postview`)
    }

    const showProfile = () => {
        console.log('show profile')
        setLgShow(true)
    }

    return (
        <>
            <Card className='post-card' style={{ width: '18rem' }}>
                <Card.Body className='post-card-body'>
                    <img onClick={showProfile} className='post-card-image' src='https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aHVtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'></img>
                    <div>
                        <Card.Title>Username</Card.Title>
                        <Card.Text onClick={navigateToPostView}>
                            {props.post.title}
                        </Card.Text>
                    </div>
                    <div className='post-icon-wrapper' >
                        <div className='post-card-icons'>
                            <Heart className='heart' />
                            <LolFace className='lol' />
                            <Comments className='comments' />
                        </div>
                        <div className='post-card-numbers'>
                            <label className='likes-count'>0</label>
                            <label className='lols-count'>0</label>
                            <label className='comments-count'>0</label>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <ProfileModal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            />
        </>
    )
}

export default SinglePost