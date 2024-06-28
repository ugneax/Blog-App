import React from 'react';
import {useParams} from "react-router-dom";
import http from "../Plugins/http";
import {useState, useEffect} from "react";


const UserPostsPage = () => {
    const { username } = useParams();
    const [post, setPost] = useState(null)
    useEffect(() => {
        http.get("/getuserposts/"+username)
            .then(res =>{
                setPost(res.data)
            })
    }, [])
    if (!post) {
        return <div>Loading...</div>

    }
    return (
        <div className="userPostsContainer">
            {post.map(post => (
                <div className="userPostsCard">
                    <h3>{post.username}</h3>
                    <h2>{post.title}</h2>
                    <img src={post.image}/>
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    )
}
export default UserPostsPage