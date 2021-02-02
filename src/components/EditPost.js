import React, {useState} from 'react'
import {BASE_URL} from '../api'


const EditPost = (props) => {

    const {posts, setPosts, token, id} = props

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [willDeliver, setWillDelivery] = useState(false)
    const [location, setLocation] = useState("")
    const [showEdit, setShowEdit] = useState(false)

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        const response = await fetch(BASE_URL + `/posts/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    willDeliver: willDeliver,
                    location: location
                }
            })
        })
        const {data} = await response.json()
        setPosts([data.post, ...posts])
        setTitle('')
        setDescription('')
        setPrice('')
        setWillDelivery('')
        setLocation('')
    }
    return (<div className='edit'>
            <button onClick={() => {
                setShowEdit(!showEdit)
            }}>{showEdit ? "Stop Edit" : "Edit"}</button>
            {showEdit ? <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)}></input>
                <input type="text" placeholder="description" value={description} onChange={(ev) => setDescription(ev.target.value)}></input>
                <input type="text" placeholder="price" value={price} onChange={(ev) => setPrice(ev.target.value)}></input>
                <label>Will Deliver?
                <input type="checkbox" placeholder="willDeliver" value={willDeliver} onChange={(ev) => {
                    setWillDelivery(!willDeliver)
                }}></input>
                </label>
                <input type="text" placeholder="location" value={location} onChange={(ev) => setLocation(ev.target.value)}></input>
                <button>Submit Edit</button>
            </form> : ""}
        </div>
    )

}

export default EditPost