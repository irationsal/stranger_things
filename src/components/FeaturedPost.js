import SendMessage from "./SendMessage"


const FeaturedPost = (props) => {

    const {posts, id, token, setUser} = props

    if(!posts)
        return <div className="featured">Nada</div>

    const [featuredPost] = posts.filter((post => {
        return post._id === id
    }))
    
    const {title, description, willDeliver, price, location, createdAt, updatedAt, messages, author: {username}, isAuthor} = featuredPost

    const displayMessage = messages && messages.length > 0

    return (
        <div className="featured">
            <h1>{title}</h1>
            <h2>Price: {price}</h2>
            <p>Updated At: {updatedAt}</p>
            <img src={`https://placeimg.com/640/480/any?${id}`}></img>
            <p>Description: {description}</p>
            <span>Author: {username}</span>
            <p>Location: {location}</p>
            <label>Will Deliver?
                <input readOnly type="checkbox" value={willDeliver}></input>
            </label>
            <p>Created At: {createdAt}</p>
            {
                (!isAuthor && token) ? <SendMessage post={featuredPost} token={token} setUser={setUser}/> : ""
            }
            {
                displayMessage ?
                <>
                <h3>Messages: </h3>
                    {messages.map((message) => {
                        return <div>
                            <h4>{message.post.title}</h4>
                            <p>{message.content}</p>
                            <span>from: {message.fromUser.username}</span>
                        </div>
                    })}
                </> : ""
            }

       </div>
    )
}

export default FeaturedPost