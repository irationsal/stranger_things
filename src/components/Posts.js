import React from 'react'
import { BASE_URL, fetchPosts } from '../api'

import PostAdd from './PostAdd'
import SendMessage from './SendMessage'

const Posts = (props) => {

    const {posts, setPosts, token, setUser} = props

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

    return (
        <>
            <PostAdd posts={posts} setPosts={setPosts} token={token}/>
            {
                posts.map((post) => {
                    return (
                        <div key={post._id}>
                            <h3>{post.title}</h3>
                            <span>from: {post.author.username}</span>
                            <p>{post.price}</p>
                            <SendMessage post={post} token={token} setUser={setUser}/>
                            {post.isAuthor ? <button onClick={() => {
                                handleDelete(post)
                            }}>DELETE</button> : ""}
                        </div>
                    )
                })
            }
        </>
    )
}

export default Posts