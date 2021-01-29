import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { BASE_URL, fetchPosts } from '../api'

import PostAdd from './PostAdd'
import SendMessage from './SendMessage'

const Posts = (props) => {

    const {posts, setPosts, token, setUser, setFeaturedPost} = props

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

    /*function goToFeatured(postID) {
        let history = useHistory()
        console.log(history)
        history.push(`featured=${postID}`)
    }*/

    return (
        <>
            {token ? <PostAdd posts={posts} setPosts={setPosts} token={token}/> : ""}
            {
                posts.map((post) => {
                    return (
                            <div key={post._id} className="post" onClick={() =>  {
                                    console.log("post div space setting",post)
                                    setFeaturedPost(post)
                                    //goToFeatured(post._id)             
                                }}>
                                    <h3>{post.title}</h3>
                                    <span>from: {post.author.username}</span>
                                    <p>{post.price}</p>
                                    {token && !post.isAuthor ? <SendMessage post={post} token={token} setUser={setUser}/> : ""}
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