import {
    Link,
  } from 'react-router-dom';

const NavBar = (props) => {

    const {token, setUser, setToken} = props
    
    return (
        <div className="nav-bar">
            <Link to='/posts'> <b>Posts</b> </Link>
            {token ? <Link to='/Profile'> <b>Profile</b> </Link> : ""}
            {!token ? <Link to='/login'><b>Login</b></Link> : ""}
            {token ? <Link to="/" onClick={() => {
                setToken("")
                localStorage.removeItem('stranger_things_token')
                localStorage.removeItem('stranger_things_user')
                setUser({})
                }}><b>Logout</b></Link> : ""}
        </div>
    )
}

export default NavBar