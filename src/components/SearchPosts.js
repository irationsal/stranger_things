import React, {useState, useEffect} from 'react'
import Posts from './Posts'

const SearchPosts = (props) => {

    const {posts, setPosts, token, setUser, setFeaturedPost} = props

    const [searchTerm, setSearchTerm] = useState('')
    
    const filtered = posts.filter((post) => {
        const searchResult = post.title.toLowerCase()
        const search = searchTerm.toLowerCase()
        if (searchResult.includes(search))
            return post
    })
    const postsToDisplay = searchTerm.length ? filtered : posts

    return (
    <>  
        <h3>Search Posts</h3>
        <input type='text' placeholder='search' value={searchTerm} onChange={async (ev) => {
            setSearchTerm(ev.target.value)
        }}>
        </input>
        <Posts posts={postsToDisplay} setPosts={setPosts} token={token} setUser={setUser} setFeaturedPost={setFeaturedPost}/>
    </>)
}

export default SearchPosts