import React, {useState} from 'react'
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

    return (<>
        <div className="search">  
            <h3>Search Posts</h3>
            <input type='text' placeholder='search' value={searchTerm} onChange={(ev) => {
                setSearchTerm(ev.target.value)
            }}>
            </input>
        </div>
        <Posts posts={postsToDisplay} setPosts={setPosts} token={token} setUser={setUser} setFeaturedPost={setFeaturedPost}/>
    </>)
}

export default SearchPosts