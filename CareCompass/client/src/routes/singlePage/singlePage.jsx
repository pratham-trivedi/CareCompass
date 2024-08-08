import "./singlePage.css";
import Slider from "../../components/slider/Slider";
import Review from "../../components/reviews/Review";
import Map from '../../components/map/Map';
import LoginModal from '../../components/loginModal/loginModal';
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import {AuthContext} from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

import React, { useContext, useState } from 'react'
import { useLoaderData } from "react-router-dom"
import { reviewData } from "../../lib/dummudata";

function singlePage() {
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
 

  const hospital = useLoaderData();

  
  const [saved, setSaved] =  useState(hospital.isSaved)
  const [reviewed, setReviewed] =  useState(hospital.userReview ? true : false)

  const {currentUser} = useContext(AuthContext);

  const handleSave = async () => {
    if(!currentUser){
      setShowModal(true);
      return;
    }
    try{
      setSaved((prev) => !prev);
      if(hospital.Gid){
      await apiRequest.post("/googledata/save", {hospitalId: hospital.Gid})
      }else{
      await apiRequest.post("/users/save", {hospitalId: hospital.id})
      }    
    }catch(err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  }

  const handleReview = async () => {

    if(!currentUser){
      setShowModal(true);
      return;
    }

    if(hospital.Gid){
      return;
    }
    
    setShowReviewModal(true);
    
  }

  return (
    <div className="singlePage">
      {showModal && <LoginModal onClose={ () => setShowModal(false)}/>}
      {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} hospital={hospital} setReviewed={setReviewed}/>  }
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
                <button className="save" onClick={handleSave}>
                  {saved ? "Hospital Saved" : "save"}</button>
                <button className="book" onClick={handleReview}>
                  {reviewed? "Edit your review" : "Leave a review"}
                </button>
              </div>
            </div>
            <div className="review">
              {hospital.reviews ? (<Review review={hospital.reviews} />) : (<Review review={reviewData} />) }
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
                <div className="text">{hospital.phone ?  hospital.phone : "Not Availible"}</div>
                <h3>Email/Website</h3>
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