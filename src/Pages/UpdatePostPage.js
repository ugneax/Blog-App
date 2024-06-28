import React from 'react';
import http from "../Plugins/http";
import {useNavigate, useParams} from "react-router-dom";
import {useRef, useState, useEffect} from "react";

const UpdatePostPage = () => {
    const titleRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()
    const navigate = useNavigate()

    const { username, id } = useParams();
    const [message, setMessage] = useState(null)
    const [post, setPost] = useState(null)
    console.log(username)

    useEffect(() => {
        http.get(`/getsinglepost/${username}/${id}`)
            .then(res =>{
                setPost(res.data)
                console.log(res.data)
            })
    }, [])

    async function updatePost() {
        const post = {
            secretKey: localStorage.getItem("secret"),
            title: titleRef.current.value,
            image: imageRef.current.value,
            description: descriptionRef.current.value,
            id: id
        }

        const res = await http.post("/updatepost/", post)

        if(res.success){
            setMessage("Everything is ok")
            navigate("/getsinglepost/" + username +"/"+ id)
        } else{
            setMessage(res.message)
        }
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="updateCard">
            <label>Post title</label>
            <input className="updateInput" type="text" ref={titleRef} defaultValue={post.title}
                   placeholder="Post title"></input>
            <label>Post image</label>
            <input className="updateInput" type="text" ref={imageRef} defaultValue={post.image}
                   placeholder="Image link"></input>
            <label>Post description</label>
            <input className="updateInput" type="text" ref={descriptionRef} defaultValue={post.description}
                   placeholder="Post description"></input>
            <p>{message}</p>
            <button onClick={updatePost} className="updateButton">Update Post</button>
        </div>
    )
}


export default UpdatePostPage