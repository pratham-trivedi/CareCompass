import React from 'react'
import { useContext } from 'react'
import SearchBar from "../../components/searchBar/searchBar"
import { AuthContext } from '../../context/AuthContext'
import "./homePage.css"

function homePage() {

    const {currentUser} = useContext(AuthContext);

    return (
        <div className="homePage">
            <div className="textContain">
                <h1 className='title'>
                    Find Best Healthcare Services With CareCompass
                </h1>
                <p>
                Welcome to <b>CareCompass</b>, your trusted source for finding nearby hospitals with ease. Whether you need immediate medical attention or are planning a visit, our platform allows you to locate hospitals and view information about each facility. At CareComfort, we strive to provide you with all the necessary information to make informed decisions about your healthcare needs, ensuring you receive the best care possible. Your health and comfort are our top priorities.
                </p>
                <SearchBar />    
                <div className="boxes">
                    <div className="box">
                        <h1>Find</h1>
                        <h2>Nearby Hospitals</h2>
                    </div>
                    <div className="box">
                        <h1>Book</h1>
                        <h2>an appointment</h2>
                    </div>
                    <div className="box">
                        <h1>Register</h1>
                        <h2>your own medical institution</h2>
                    </div>
                </div>
            </div>
            <div className="imageContain">
                <img src="/images/lady_doc.jpg" className="homeImage" />
                <img src="/images/CareCompass_logo.png" className='CareLogo' />
            </div>
        </div>
    )
}

export default homePage