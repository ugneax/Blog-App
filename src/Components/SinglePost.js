import React from 'react';
import MainStore from "../Store/MainStore";
import {useNavigate} from "react-router-dom";


const SinglePost = ({post}) => {

    const navigate = useNavigate()
    const {logged, favorites, setFavorites } =MainStore()

    function navigateToSinglePost(){
        navigate("/getsinglepost/" + post.username +"/"+ post.id)
    }

    function navigateToUserPosts(){
        navigate("/getuserpost/" + post.username)
    }

    function addTofavorite(post){
        const favoritePosts  = JSON.parse(localStorage.getItem("favorites"))

        if (favoritePosts) {
            const postExist = favoritePosts.find(x => x.id === post.id);
            if (postExist) {
                alert("This post already in favorites!")
                return
            }

            favoritePosts.push(post);
            localStorage.setItem("favorites", JSON.stringify(favoritePosts));
            setFavorites(favoritePosts.length)
        } else {
            localStorage.setItem("favorites", JSON.stringify([post]));
            setFavorites(favoritePosts.length)
        }
    }

    return (
        <div className="postCard" >
            <img src={post.image}/>
            <h3 className="postTitle" onClick={navigateToSinglePost}>{post.title}</h3>
            <h5 onClick={navigateToUserPosts}>{post.username} </h5>
            {logged && (<button onClick={() => addTofavorite(post)}>Add to favorites</button>)}
        </div>
    )
}

export default SinglePost

