import React, {useState} from 'react'
import {BASE_URL, fetchPosts} from '../api'


const EditPost = (props) => {

    const {posts, setPosts, token, id, setUser} = props
    const editPost = posts.find((post) => id === post._id)

    const {title, description, price, willDeliver, 
        location} = editPost

    const [editTitle, setTitle] = useState(title)
    const [editDescription, setDescription] = useState(description)
    const [editPrice, setPrice] = useState(price)
    const [editWillDeliver, setWillDelivery] = useState(willDeliver)
    const [editLocation, setLocation] = useState(location)
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
                    title: editTitle,
                    description: editDescription,
                    price: editPrice,
                    willDeliver: editWillDeliver,
                    location: editLocation
                }
            })
        })
        const {data: {posts}} = await fetchPosts(token)
        
        setPosts(posts)
        const editPost = posts.find((post) => id === post._id)

        const updateUser = await fetch(BASE_URL + `/users/me`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const {data} = await updateUser.json()
        setUser(data)

        const {title, description, price, willDeliver, 
        location} = editPost
        setTitle(title)
        setDescription(description)
        setPrice(price)
        setWillDelivery(willDeliver)
        setLocation(location)
        setShowEdit(false)
    }
    return (<div className='edit'>
            <button onClick={() => {
                setShowEdit(!showEdit)
            }}>{showEdit ? "Stop Edit" : "Edit"}</button>
            {showEdit ? <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" value={editTitle} onChange={(ev) => setTitle(ev.target.value)}></input>
                <textarea type="text" placeholder="description" value={editDescription} onChange={(ev) => setDescription(ev.target.value)}></textarea>
                <input type="text" placeholder="price" value={editPrice} onChange={(ev) => setPrice(ev.target.value)}></input>
                <label>Will Deliver?
                <input type="checkbox" placeholder="willDeliver" checked={editWillDeliver} onChange={(ev) => {
                    setWillDelivery(!editWillDeliver)
                }}></input>
                </label>
                <input type="text" placeholder="location" value={editLocation} onChange={(ev) => setLocation(ev.target.value)}></input>
                <button>Submit Edit</button>
            </form> : ""}
        </div>
    )

}

export default EditPost