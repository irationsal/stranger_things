import { useEffect } from "react"
import Posts from "./Posts"
import { BASE_URL } from '../api'

const Profile = (props) => {
    const {user, token, setFeaturedPost, setUser, setPosts} = props

    if(!token)
        return (
            <div className="logged-out">
                You should sign in!
            </div>
        )

    const {messages} = user

    const displayMessages = messages && messages.length > 0

    const sentMessages = messages.filter((message) => user.username === message.fromUser.username)
    const recievedMessages = messages.filter((message) => user.username !== message.fromUser.username)
    const displayedPosts = user.posts.filter(post => post.active ? true : false)

    useEffect(async () => {
        const updateUser = await fetch(BASE_URL + `/users/me`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const {data} = await updateUser.json()
        setUser(data)
    }, [])

    return (<>
        <div className="profile">
            <h2>Profile</h2>
            <div className="user-posts">
                <Posts posts={displayedPosts} token={token} setFeaturedPost={setFeaturedPost} userPosts={true} id={user._id} name={user.username} setPosts={setPosts} setUser={setUser} />
            </div>
            <h2>Messages: ({messages.length})</h2>
            <div className="user-messages">
                <div className="recieved-messages">
                    <h3>Recieved ({recievedMessages.length})</h3>
                    {displayMessages ? recievedMessages.map((message, index) => {
                        return (
                            <div key={index} className="message">
                                <h4>{index + 1}: {message.post.title}</h4>
                                <p>{message.content}</p>
                                <span>from: {message.fromUser.username}</span>
                            </div>
                        )
                    }) : "No messages sorry."}
                </div>
                <div className="sent-messages">
                    <h3>Sent ({sentMessages.length})</h3>
                    {displayMessages ? sentMessages.map((message, index) => {
                        return (
                            <div key={index} className="message">
                                <h4>{index + 1}: {message.post.title}</h4>
                                <p>{message.content}</p>
                                <span>from: {message.fromUser.username}</span>
                            </div>
                        )
                    }) : "No messages sorry."}
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile