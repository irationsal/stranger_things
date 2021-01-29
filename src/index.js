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
  Profile
} from './components'

import {
  fetchPosts
} from './api'

const App = () => {

  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  const [posts, setPosts] = useState([])

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
              <Link to='/posts'> Posts</Link>
            </> : ""}
          </Route>
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
            {token ? <Posts posts={posts} setPosts={setPosts} token={token} setUser={setUser}/> : <p>Not Logged In</p>}
          </Route>
          </div>)
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)