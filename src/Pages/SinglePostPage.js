import React, {useEffect, useState} from 'react';
import SinglePost from "../Components/SinglePost";
import http from "../Plugins/http";
import {useNavigate, useParams} from "react-router-dom";
import MainStore from "../Store/MainStore";

const SinglePostPage = () => {
    const {username, id} = useParams()
    const [post , setPost] = useState(null)
    const {logged} = MainStore()
    const navigate = useNavigate()
    const [formattedDateTime, setFormattedDateTime] = useState(null);

    useEffect(() => {
        http.get(`/getsinglepost/${username}/${id}`)
            .then(res =>{
                if(res.success){
                    formatDateTime(res.data.timestamp)
                    setPost(res.data)
                }
            })
    }, [])



    const formatDateTime = (timestamp) => {
        const formattedDateTime = new Intl.DateTimeFormat('lt', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }).format(new Date(timestamp));

        setFormattedDateTime(formattedDateTime);
    }



    function navigateToUpdate(){
        navigate("/updatepost/"+ username + '/' + id)
    }

    async function deletePost(){
        const post = {
            secretKey: localStorage.getItem("secret"),
            id: id
        }

        const res = await http.post("/deletepost", post)

        if(res.success){
            alert("Post deleted")
            navigate("/allposts")
        }
    }


    if (!post) {
        return <div>Loading...</div>;
    }


    return (
        <div className="singlePostCard">
            <h2>{post.title}</h2>
            <p>{post.username}</p>
            <img src={post.image} alt={post.title}/>
            <p className="singlePostDescription">{post.description}</p>
            <p>{formattedDateTime}</p>
            {logged && (<button className="updateButton" onClick={navigateToUpdate}>Update post</button>)}
            {logged && (<button className="deleteButton" onClick={deletePost}>Delete post</button>)}
        </div>
    )
}

export default SinglePostPage