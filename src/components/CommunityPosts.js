import './css/communityPosts.scss'
import SinglePost from './SinglePost'

function CommunityPosts(props) {

    const showPosts = () => {

        return props.posts?.map((post) =>
            <SinglePost
                key={post._id}
                post={post}
                changeCurrentPost={props.changeCurrentPost}
                counters={props.counters}
                changeCounters={props.changeCounters}
                viewCommon={props.viewCommon}
                updateLikes={props.updateLikes}
                updateLols={props.updateLols}
                updateComments={props.updateComments}
            />
        )
    }

    return (
        <>
            <div className='posts-wrapper'>
                {showPosts()}
            </div>
        </>
    )
}

export default CommunityPosts