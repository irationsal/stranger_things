const FeaturedPost = (props) => {
    const {posts, id} = props

    if(!posts)
        return <div className="featured">Nada</div>

    const [featuredPost] = posts.filter((post => {
        return post._id === id
    }))
    
    const {title, description, willDeliver, price, location, createdAt, updatedAt, messages, author: {username}} = featuredPost

    const displayMessage = messages && messages.length > 0

    console.log(featuredPost)
    return (
        <div className="featured">
            <h1>{title}</h1>
            <h2>Price: {price}</h2>
            <p>Updated At: {updatedAt}</p>
            <p>Description: {description}</p>
            <span>Author: {username}</span>
            <p>Location: {location}</p>
            <label>Will Deliver?
                <input readOnly type="checkbox" value={willDeliver}></input>
            </label>
            <p>Created At: {createdAt}</p>
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