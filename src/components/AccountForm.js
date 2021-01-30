import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import {
    BASE_URL
} from '../api'

const AccountForm = (props) => {

    const {setToken, setUser, type} = props

    const title = type ==="login" ? 'Login' : 'Register'
    const switchTitle = type ==="login" ? 'Register' : 'Login'
    const switchType = type ==="login" ? 'register' : 'login'

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSumbit = async (ev) => {
        ev.preventDefault()
        const response = await fetch(BASE_URL + `/users/${type}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
        const {data} = await response.json()
        const token = data.token
        if(token) {
            setToken(token)
            localStorage.setItem('stranger_things_token', JSON.stringify(token))
            const response = await fetch(BASE_URL + `/users/me`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            const {data} = await response.json()
            localStorage.setItem('stranger_things_user', JSON.stringify(data))
            setUser(data)
        }
        setUsername('')
        setPassword('')
    }

    return (<>
            <h2>{title}</h2>
            <form onSubmit={handleSumbit}>
                <input type="text" value={username} placeholder="username" onChange={(ev) => {
                    setUsername(ev.target.value)
                }}></input>
                <input type="password" value={password} placeholder="password" onChange={(ev) => {
                    setPassword(ev.target.value)
                }}></input>
                <button>{title}</button>
                <Link to={`/${switchType}`}>{switchTitle}</Link>
            </form>
        </>)
}

export default AccountForm