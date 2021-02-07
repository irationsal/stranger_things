import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import {
  AccountForm,
  SearchPosts,
  Profile,
  FeaturedPost,
  PostAdd
} from './components'

import {
  fetchPosts
} from './api'
import NavBar from './components/NavBar';

const App = () => {

  const getTokenFromLocal = () => {

    const token = JSON.parse(localStorage.getItem('stranger_things_token'))

    if(!token)
      return ''

    return token
  }

  const getUserDataFromLocal = () => {
    const userData = JSON.parse(localStorage.getItem('stranger_things_user'))
    if(!userData)
      return {}
    
    return userData
  }

  const [user, setUser] = useState(getUserDataFromLocal())
  const [token, setToken] = useState(getTokenFromLocal())
  const [posts, setPosts] = useState([])
  const [featuredPost, setFeaturedPost] = useState({})

  useEffect(async () => {
    const {data} = await fetchPosts(token)
    setPosts(data.posts)
  }, [token])

  return (<>
          <header>
              <h1>Stranger Things</h1>
          </header>
          {token && <div className="logged-in">Hello, <Link to='/profile'><b>{user.username}</b></Link></div>}
          <Route path="/">
            <NavBar token={token} setToken={setToken} setUser={setUser}/>
          </Route>
          <Route path="/login">
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} />
          </Route>
          <Route path="/register">
            <AccountForm type={'register'} setToken={setToken} setUser={setUser} />
          </Route>
          <Route path="/profile">
            <Profile user={user} token={token} setFeaturedPost={setFeaturedPost} setUser={setUser}/>
          </Route>
          <Route path="/posts">
            {token ? <PostAdd posts={posts} setPosts={setPosts} token={token}/> : ""}
            <SearchPosts posts={posts} setPosts={setPosts} token={token} setUser={setUser} setFeaturedPost={setFeaturedPost}/>
          </Route>
          <Route path={`/featured/:id`}>
              <FeaturedPost posts={posts} id={featuredPost._id} token={token} setUser={setUser} setPosts={setPosts}/>
          </Route>
          </>)
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)