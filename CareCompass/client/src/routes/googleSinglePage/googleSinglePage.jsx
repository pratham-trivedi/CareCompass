import "./googleSinglePage.css"
import Slider from "../../components/slider/Slider"
import {singlePostData} from "../../lib/dummudata"
import Review from "../../components/reviews/Review"
import Map from '../../components/map/Map'

import React from 'react'
import { useLoaderData } from "react-router-dom"

const pageData = singlePostData;
const nullData = null;

function singlePage() {

  const hospital = useLoaderData();
  console.log(hospital.reviews);

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={hospital.images}/>
          <div className="info">
            <div className="text">
              <div className="post">
                <h1>{hospital.name}</h1>
                <div className="address">
                  {hospital.address}
                </div>
                <div className="rate">
                  Rating : {hospital.rating}
                </div>
              </div>
              <div className="btn">
                <button className="save">Save</button>
                <button className="book">Book Appointment</button>
              </div>
            </div>
            <div className="review">
              <Review review={hospital.reviews} />
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
            <div className="map">
              <Map hospitals={[hospital]}/>
            </div>
            <div className="information">
              <h1>Contact</h1>
              <div className="contact">
                <h3>Phone</h3>
                <div className="text">{hospital.phone}</div>
                <h3>Email</h3>
                <div className="text">{hospital.email ? hospital.email : "Not Availible"}</div>
              </div>
              <h3>Timing</h3>
              <div className="timing">
                <div className="text"><b>Open - </b>{hospital.opentime}</div>
                <div className="text"><b>Close - </b>{hospital.closetime}</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default singlePage