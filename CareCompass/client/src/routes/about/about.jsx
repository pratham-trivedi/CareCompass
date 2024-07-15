import React from 'react'
import "./about.css"

function About() {

    return (
        <div className="aboutPage">
            <div className="textContain">
                <h1 className='title'>
                    About Us
                </h1>
                <p>
                <b>CareCompass</b> is created as a part of Intel Unnati training program. We tried to focus on services which common people requires and tried to deliver on it.
                </p>
            </div>
            <div className="imageContain">
                <img src="/images/lady_doc.jpg" className="homeImage" />
                <img src="/images/CareCompass_logo.png" className='CareLogo' />
            </div>
        </div>
    )
}

export default About