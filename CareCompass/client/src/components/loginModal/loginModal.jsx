import React from 'react'
import "./loginModal.css"
import { Link } from 'react-router-dom'


function loginModal({onClose}) {
  return (
    <div className='backgrnd'>
        <div className='modalContain'>
            <button className='close' onClick={onClose}>X</button>
            <h1 classname="modalText">Please <Link to="/login" className='loginRedirect'>Login</Link> to use this feature</h1>
        </div>
    </div>
  )
}

export default loginModal