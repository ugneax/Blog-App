import React, {useRef, useState} from 'react';
import http from "../Plugins/http";
import MainStore from "../Store/MainStore";
import {useNavigate} from "react-router-dom";

const CreateAccountPage = () => {

    const nameRef = useRef()
    const passwordOne = useRef()
    const passwordTwo = useRef()
    const {message, setNewMessage } = MainStore()
    const [display, setDisplay] = useState("block")
    const [displayLogin, setDisplayLogin] = useState("none")
    const navigate = useNavigate()


    async function createAcc(){
        const user = {
            name: nameRef.current.value,
            passwordOne: passwordOne.current.value,
            passwordTwo: passwordTwo.current.value,
        }

        const res = await http.post("/createaccount", user)

        if(res.success){
            setTimeout(() =>{
                setNewMessage("")
                setDisplay("none")
                setDisplayLogin("block")
            }, 1000)
            setNewMessage("Account was created!")

        } else{
            setNewMessage(res.message)
        }
    }

    function goToPosts(){
        navigate("/login")
    }

    return (
        <div className="createAccContainer">
            <h2>Create your account</h2>
            <div className="inputsContainer">
                <input className="inputField" type="text" ref={nameRef} placeholder="Enter your name"/>
                <input className="inputField" type="text" ref={passwordOne} placeholder="Password"/>
                <input className="inputField" type="text" ref={passwordTwo} placeholder="Repeat password"/>
            </div>
            <h4>{message}</h4>
            <button className="createAccButton" onClick={createAcc} style={{display:display}}>Create account</button>
            <button className="goToLoginButton" onClick={goToPosts} style={{display:displayLogin}}>Go to login</button>

        </div>
    )
}

export default CreateAccountPage