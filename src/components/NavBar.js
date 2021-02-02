import {
    Link,
  } from 'react-router-dom';

const NavBar = (props) => {

    const {token} = props
    
    return (
        <div className="nav-bar">
            <Link to='/posts'> Posts </Link>
            {!token ? <Link to='/login'>Login</Link> : ""}
        </div>
    )
}

export default NavBar