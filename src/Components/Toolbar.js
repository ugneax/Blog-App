import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import MainStore from "../Store/MainStore";


const Toolbar = ({logged, setLoggedIn}) => {

    const {favorites,IsLogged} = MainStore()
    const navigate= useNavigate()

    function logout(){
        localStorage.removeItem("secret")
        localStorage.removeItem("favorites")
        setLoggedIn(null)
        IsLogged(false)
        navigate("/allposts")
    }

    return (
        <div className="toolbar">
            <div className="toolbarContainer">
                <div>
                    {!logged && (<Link style={{textDecoration: "none", color: "black"}} to="/createaccount">Create
                        account</Link>)}
                </div>
                <div>
                    {!logged && (<Link style={{textDecoration: "none", color: "black"}} to="/login">Login</Link>)}
                </div>
                <div>
                    {logged && (
                        <Link style={{textDecoration: "none", color: "black"}} to="/createpost">Create post</Link>)}
                </div>
                <div>
                    <Link style={{textDecoration: "none", color: "black"}} to="/allposts">Posts blog</Link>
                </div>
                <div>
                    {logged && (
                        <Link style={{textDecoration: "none", color: "black"}} to="/favorites">Favorites ({favorites})</Link>)}
                </div>
            </div>
            <div className="loginToolbarContainer">
                {logged && <h3>Logged in as: {logged}</h3>}
                {logged && <button className="logoutButton" onClick={logout}>Log out</button>}
            </div>

        </div>
    )
}

export default Toolbar