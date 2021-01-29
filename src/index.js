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
  fetchPosts
} from './api'

const App = () => {

  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  const [posts, setPosts] = useState([])
  const [featuredPost, setFeaturedPost] = useState({})

  useEffect(async () => {
      try {
          const {data} = await fetchPosts(token)
          setPosts(data.posts)
      } catch(error) {
          console.log(error)
      }
  }, [token])

  return (<div className="app">
          <header>
              <h1>Stranger Things</h1>
              {user.username && <div>Hello {user.username}</div>}
              {token ? <Link to="/" onClick={() => {
                setToken("")
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
          <Link to={`/featured=${featuredPost._id}`}> Featured </Link>
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
              {featuredPost ? <FeaturedPost featuredPost={featuredPost}/> : ""}
          </Route>
          </div>)
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)