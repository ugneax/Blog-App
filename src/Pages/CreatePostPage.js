import React from 'react';
import {useRef, useState} from "react";
import http from "../Plugins/http";
import {useNavigate} from "react-router-dom";

const CreatePostPage = () => {
    const titleRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()
    const navigate = useNavigate()

    const [message, setMessage] = useState(null)

    async function createPost() {
        const post = {
            secretKey: localStorage.getItem("secret"),
            title: titleRef.current.value,
            image: imageRef.current.value,
            description: descriptionRef.current.value
        }

        const res = await http.post("/createpost", post)

        if(res.success){
            setMessage("Everything is ok")
            navigate("/allposts")
        } else{
            setMessage(res.message)
        }
    }

    return (
        <div className="createPostContainer">
            <h2>Create post</h2>
            <input className="createInput" type="text" ref={titleRef} placeholder="Post title"></input>
            <input className="createInput" type="text" ref={imageRef} placeholder="Image link"></input>
            <input className="createInput" type="text" ref={descriptionRef} placeholder="Post description"></input>
            <p>{message}</p>
            <button onClick={createPost} className="createButton">Submit post</button>
        </div>
    )
}

export default CreatePostPage