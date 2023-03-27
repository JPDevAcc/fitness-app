import './css/communityPosts.scss'
import SinglePost from './SinglePost'

function CommunityPosts(props) {

    const showPosts = () => {
        console.log(props.posts)
        return props.posts?.map((post) =>
            <SinglePost
                key={post._id}
                post={post}
            />
        )
    }

    return (
        <>
            <div>CommunityPosts</div>
            <div className='posts-wrapper'>
                {showPosts()}
            </div>

        </>
    )
}

export default CommunityPosts