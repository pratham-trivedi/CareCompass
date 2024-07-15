import React, { useContext } from 'react'
import {Link,  useNavigate } from "react-router-dom"
import "./login.css"
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from '../../context/AuthContext';

function login() {

  const [error, setError] = useState("");
  const [isLoaing, setIsLoading] = useState(false);

  const{updateUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    
    const username = formData.get("username");
    const password = formData.get("password");

    try{
    const res = await apiRequest.post("auth/login", {
      username, 
      password,
    })

    updateUser(res.data);
    navigate("/");
  }catch(err){
    console.log(err.response.data.message);
    setError(err.response.data.message);
  }finally{
    setIsLoading(false);
  }

  }

  return (
    <div className="loginPage">
    <div className="formContainer">
      <form onSubmit={handlesubmit}>
        <h1>Welcome Back</h1>
        <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
        <input name="password" type="password" required placeholder="Password" />
        {error && <span>Login Failed, try again</span>}
        <button disabled={isLoaing}>Login</button>
        <Link to="/register">Don't have an account?</Link>
      </form>
    </div>
  </div>
  )
}

export default login