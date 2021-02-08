import React, {useState} from 'react'
import Posts from './Posts'

const SearchPosts = (props) => {

    const {posts, setPosts, token, setUser, setFeaturedPost} = props

    const [searchTerm, setSearchTerm] = useState('')
    const [isPriceSearch, setIsPriceSearch] = useState(false)
    const [isAuthorSearch, setIsAuthorSearch] = useState(false)
    
    const filtered = posts.filter((post) => {
        const searchResult = isPriceSearch ? post.price.toLowerCase() : isAuthorSearch ? post.author.username.toLowerCase() : post.title.toLowerCase()
        const search = searchTerm.toLowerCase()
        if (searchResult.includes(search))
            return post
    })

    const postsToDisplay = searchTerm.length ? filtered : posts
    const authorOrPriceHolder = isAuthorSearch ? "search author" : isPriceSearch ? "search price" : "search title"

    return (<>
        <div className="search">  
            <h3>Search Posts</h3>
            <input type='text' placeholder={authorOrPriceHolder} value={searchTerm} onChange={(ev) => {
                setSearchTerm(ev.target.value)
            }}>
            </input>
            <label>
                Author Search
                <input type='checkbox' checked={isAuthorSearch} onChange={() => {
                    if(!isAuthorSearch)
                        setIsPriceSearch(false)
                    setIsAuthorSearch(!isAuthorSearch)
                }}></input>
            </label>
            <label>
                Price Search
                <input type='checkbox' checked={isPriceSearch} onChange={() => {
                    if(!isPriceSearch)
                        setIsAuthorSearch(false)
                    setIsPriceSearch(!isPriceSearch)
                }}></input>
            </label>
        </div>
        <Posts posts={postsToDisplay} setPosts={setPosts} token={token} setUser={setUser} setFeaturedPost={setFeaturedPost}/>
    </>)
}

export default SearchPosts