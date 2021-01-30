import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

import {
  AccountForm,
  Posts,
  Profile,
  FeaturedPost
} from './components'

import {
  BASE_URL,
  fetchPosts
} from './api'

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

  console.log(user)

  return (<div className="app">
          <header>
              <h1>Stranger Things</h1>
              {user.username && <div>Hello {user.username}</div>}
              {token ? <Link to="/" onClick={() => {
                setToken("")
                localStorage.removeItem('stranger_things_token')
                localStorage.removeItem('stranger_things_user')
                setUser({})
                }}>Logout</Link> : ""}
          </header>
          <Route path="/">
            {token ? 
            <>
              <Link to='/profile'>Profile</Link>
            </> : ""}
          </Route>
          <Link to='/posts'> Posts </Link>
          {!token ? <Link to='/login'>Login</Link> : ""}
          <Route path="/login">
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} />
          </Route>
          <Route path="/register">
            <AccountForm type={'register'} setToken={setToken} setUser={setUser} />
          </Route>
          <Route path="/profile">
            <Profile user={user}/>
          </Route>
          <Route path="/posts">
            {<Posts posts={posts} setPosts={setPosts} token={token} setUser={setUser} setFeaturedPost={setFeaturedPost}/>}
          </Route>
          <Route path={`/featured=${featuredPost._id}`}>
              <FeaturedPost posts={posts} id={featuredPost._id}/>
          </Route>
          </div>)
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)