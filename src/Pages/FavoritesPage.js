import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MainStore from "../Store/MainStore";

const FavoritesPage = () => {

    const [myFavorites, setMyFavorites] = useState([])
    const {setFavorites, favorites} = MainStore()

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"))

        if(storedFavorites) {
            setMyFavorites(storedFavorites)
        }
    }, [])

    const removeFromFavorite = (postId) => {

        let updatedFavorites = myFavorites.filter(x => x.id !== postId)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
        setMyFavorites(updatedFavorites)
        setFavorites(myFavorites.length-1)
    }
    return (
        <div className="favoritesContainer">
            {myFavorites.length === 0 &&
                <h1 className="noFavorites">You have no favorites!</h1>
            }
            {myFavorites.map((post, index)=>(
                <div key={index} className="favoritePost">
                    <h2>{post.title}</h2>
                    <h5>{post.username}</h5>
                    <img src={post.image}/>
                    <div>{post.description}</div>
                    <button onClick={() =>removeFromFavorite(post.id)}>Remove from favorites</button>
                </div>
            ))}
        </div>
    )
}

export default FavoritesPage;