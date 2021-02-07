import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL, fetchPosts } from '../api'

import SendMessage from './SendMessage'
import EditPost from './EditPost'

const Posts = (props) => {

    const {posts, setPosts, token, setUser, setFeaturedPost, id, name} = props

    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleDelete = async (post) => {
        const response = await fetch(BASE_URL + `/posts/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const {data} = await fetchPosts(token)
        setPosts(data.posts)
    }

    return (<div className="post-section">
        <h3>Posts</h3>
        <div className="postlist">
            {
                posts.map((post) => {
                    return (
                            <div key={post._id} className="post-container">
                                    <div className="post" style={{border: `${post.isAuthor ? "solid 1px yellow" : ''}`}}>
                                        <Link to={`featured/${post._id}`} onClick={() => {setFeaturedPost(post)}}>
                                            <h3>{post.title}</h3>
                                            <span>from: {post.author.username ? post.author.username : name}</span>
                                            <p>{post.price}</p>
                                        </Link>
                                    </div>
                                    {token && !post.isAuthor && (post.author !== id) ? <SendMessage post={post} token={token} setUser={setUser}/> : ""}
                                    {(post.isAuthor || post.author === id) && !confirmDelete ? <button onClick={() => {
                                        setConfirmDelete(!confirmDelete)
                                    }}>DELETE</button> : ""}
                                    {confirmDelete && (post.isAuthor || post.author === id) ? <>
                                        <button onClick={() => {
                                            setConfirmDelete(false)
                                        }}>DO NOT DELETE</button>
                                        <button onClick={() => {
                                            handleDelete(post)
                                        }}>CONFIRM DELETE</button>
                                    </> : ""} 
                                    {post.isAuthor || post.author === id ? <EditPost posts={posts} token={token} setPosts={setPosts} id={post._id}/> : ""}
                            </div>
                        
                    )
                })
            }
        </div>
    </div>)
}

export default Posts