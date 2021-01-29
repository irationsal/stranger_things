const Profile = (props) => {
    const {user} = props
    const {messages} = user

    const displayMessages = messages && messages.length > 0
    return (
        <div>
            {
                displayMessages ? messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <h4>{message.post.title}</h4>
                            <p>{message.content}</p>
                            <span>from: {message.fromUser.username}</span>
                        </div>
                    )
                }) : "No messages sorry."
            }
        </div>
    )
}

export default Profile