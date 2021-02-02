import Posts from "./Posts"

const Profile = (props) => {
    const {user, token, setFeaturedPost} = props
    const {messages} = user

    //console.log("user", user)

    const displayMessages = messages && messages.length > 0
    const displayedPosts = user.posts.filter(post => post.active ? true : false)

    return (<>
        <div className="profile">
            <h2>Profile</h2>
            <div className="user-posts">
                <Posts posts={displayedPosts} token={token} setFeaturedPost={setFeaturedPost} userPosts={true} id={user._id} />
            </div>
            <h2>Messages: ({messages.length})</h2>
            <div className="user-messages">
                {
                    displayMessages ? messages.map((message, index) => {
                        return (
                            <div key={index} className="message">
                                <h4>{index + 1}: {message.post.title}</h4>
                                <p>{message.content}</p>
                                <span>from: {message.fromUser.username}</span>
                            </div>
                        )
                    }) : "No messages sorry."
                }
            </div>
        </div>
        </>
    )
}

export default Profile