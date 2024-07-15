import "./navbar.css"
import "./resp_navbar.css"

import React, { useState, useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";

function Navbar() {

  const [open, setOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  return (
    <nav>
      <div className='left'>
        <a href="/" className="logo">
          <img src="/public/images/CareCompass_logo.png" />
        </a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/addhospital">For Hospitals</a>
      </div>
      <div className='right'>
        {currentUser ? (
        <div className="user">
          <Link to="/profile" className="profile">{currentUser.name}</Link>
        </div>
        ) : (
        <>
        <a href="/login">Sign in</a>
        <a href="/register" className="register">Sign up</a>
        </>)}
        <div className={open ? "menuIconRotate menuIcon" : "menuIcon"}>
          <img 
          src="/public/images/menu.png" 
          alt="menu" 
          onClick={() => setOpen(!open)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/addhospital">For Hospitals</a>
          {currentUser ? (
              <a href="/profile" className="profile">{currentUser.name}</a>
          ) : (
            <>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
          </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
