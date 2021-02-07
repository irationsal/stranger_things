import { useEffect } from "react"
import {useParams} from 'react-router-dom';
import { fetchPosts } from "../api"
import SendMessage from "./SendMessage"


const FeaturedPost = (props) => {

    const {id} = useParams()
    const {posts, token, setUser, setPosts} = props

    useEffect(async () => {
        const {data: {posts}} = await fetchPosts(token)
        setPosts(posts)
    }, [id])

    if(!posts)
        return <div className="featured">Nada</div>

    const featuredPost = posts.find((post => {
        return post._id === id
    }))

    if(!featuredPost)
        return <div className="featured">Nada</div>
    
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
                <input readOnly type="checkbox" checked={willDeliver}></input>
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
                        return <div className="message">
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