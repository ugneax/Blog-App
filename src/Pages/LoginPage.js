import React, {useRef} from 'react';
import http from "../Plugins/http";
import MainStore from "../Store/MainStore";
import {useNavigate} from "react-router-dom";


const LoginPage = ({setLogged}) => {

    const nameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const { IsLogged, message, setNewMessage, whoIsLogged} = MainStore()

    async function login(){
        setNewMessage("")
        const user= {
            name: nameRef.current.value,
            password: passwordRef.current.value
        }

        const res = await http.post("/login", user)

        if (res.success){
            localStorage.setItem("secret", res.secretKey)
            setLogged(user.name)
            navigate("/allposts")
            IsLogged(true)
        }else {
            setNewMessage(res.message)
        }
    }
    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <input className="inputField" type="text" ref={nameRef} placeholder="Enter your name"/>
            <input className="inputField" type="text" ref={passwordRef} placeholder="Enter your password"/>
            <h5>{message}</h5>
            <button className="loginButton" onClick={login} >Login</button>
        </div>
    )
}

export default LoginPage