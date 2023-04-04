import './css/communityPosts.scss'
import { Card, Button } from 'react-bootstrap'
import { ReactComponent as Heart } from "./Images/redheart.svg"
import { ReactComponent as Comments } from "./Images/comments.svg"
import { ReactComponent as LolFace } from "./Images/lol2.svg"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ProfileModal from './ProfileModal';
import CommunityService from '../services/communityService'
import { getProfileImageUrl } from '../utils/image'

function SinglePost(props) {

    const url = getProfileImageUrl(props.post.profileImg)

    const [likeCounter, changeLikeCounter] = useState(0)
    const [lolCounter, changeLolCounter] = useState(0)
    const [commentCounter, changeCommentCounter] = useState(0)


    const communityService = new CommunityService(props.viewCommon.net)

    const updateLikes = async () => {
        const response = await communityService.getLikesCount(props.post._id)
        const likes = await response.data
        changeLikeCounter(likes)
    }

    const updateLols = async () => {
        const response = await communityService.getLolsCount(props.post._id)
        const lols = await response.data
        changeLolCounter(lols)
    }

    const updateComments = async () => {
        const response = await communityService.getCommentCount(props.post._id)
        const comments = await response.data
        changeCommentCounter(comments)
    }

    useEffect(() => {
        const updateThings = () => {
            updateLikes()
            updateLols()
            updateComments()
        }
        updateThings()
    }, [])

    const likePost = async () => {
        const response = await communityService.addLikeToPost(props.post._id)

        if (response.status === 200) {
            updateLikes()
        }
    }

    const lolPost = async () => {
        const response = await communityService.addLolToPost(props.post._id)

        if (response.status === 200) {
            updateLols()
        }
    }

    const [lgShow, setLgShow] = useState(false);


    const navigate = useNavigate();

    const navigateToPostView = () => {
        props.changeCurrentPost(props.post)
        navigate(`/postview`)
    }

    const findUser = async (data) => {
        const response = await communityService.findUser(data)
        console.log(response)
        return response.data
    }

    const showProfile = async () => {
        const userData = await findUser(props.post.username)
        const userProfile = await userData.userProfile
        props.changeUserProfile(userProfile)
        setLgShow(true)
    }

    return (
        <>
            <Card className='post-card' style={{ width: '18rem' }}>
                <Card.Body className='post-card-body'>
                    <img onClick={showProfile} className='post-card-image' src={url}></img>
                    <div className='post-username'>
                        <Card.Title>{props.post.username}</Card.Title>
                        <Card.Text onClick={navigateToPostView}>
                            {props.post.title}
                        </Card.Text>
                    </div>
                    <div className='post-icon-wrapper' >
                        <div className='post-card-icons'>
                            <Heart onClick={likePost} className='heart' />
                            <LolFace onClick={lolPost} className='lol' />
                            <Comments className='comments' />
                        </div>
                        <div className='post-card-numbers'>
                            <label className='likes-count'>{likeCounter}</label>
                            <label className='lols-count'>{lolCounter}</label>
                            <label className='comments-count'>{commentCounter}</label>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <ProfileModal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                viewCommon={props.viewCommon}
                userProfile={props.userProfile}

            />
        </>
    )
}

export default SinglePost