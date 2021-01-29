import React, {useState} from 'react'
import { BASE_URL } from '../api'

const SendMessage = (props) => {

    const {post, token, setUser} = props

    const [message, setMessage] = useState('')

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        const response = await fetch(BASE_URL + `/posts/${post._id}/messages`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: message
                }
            })
        })
        setMessage("")
        const updateUser = await fetch(BASE_URL + `/users/me`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const {data} = await updateUser.json()
        setUser(data)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={message} onChange={(ev) => setMessage(ev.target.value)}></input>
            <button>Send Message</button>
        </form>
    )
}

export default SendMessage