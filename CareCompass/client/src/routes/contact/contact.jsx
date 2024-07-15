import React from 'react'
import "./contact.css"

function Contact() {

    return (
        <div className="contactPage">
            <div className="textContain">
                <h1 className='title'>
                    Contact Us
                </h1>
                <p>
                Get in touch with us via mail, or catch us on linkedIn.
                </p>
            <div className="boxes">
                    <div className="box">
                        <h1>Email</h1>
                        <h2>carecompass@mail.com</h2>
                    </div>
                    <div className="box">
                        <h1>Call us</h1>
                        <h2>079 11223444</h2>
                        <h2>1800 1232 1212</h2>
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

export default Contact;