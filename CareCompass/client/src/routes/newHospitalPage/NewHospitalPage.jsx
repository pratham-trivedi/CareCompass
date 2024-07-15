import "./newHospitalPage.css"

import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import Getlatlng from "../../components/getlatlng/Getlatlng";
import apiRequest from "../../lib/apiRequest"
import UploadImages from "../../components/uploadImages/UploadImages";

const specialityOptions = [
  'Hospital',
  'Pharmacy',
  'Cardiology',
  'Physiotherapy',
  'Dermatology',
  'oncology',
  'Neurology',
  'Pediatrics',
  'Ophthalmology',
  'Gynecology',
];

function NewHospitalPage() {
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   const data = new FormData(e.target);
   const inputs = Object.fromEntries(data);
   try{
    const res = await apiRequest.post("/post",{
        name: inputs.name,
        address: inputs.address,
        city: inputs.city,
        latitude: inputs.latitude,    
        longitude: inputs.longitude,
        email: inputs.email,
        phone: inputs.phone,
        opentime: inputs.openTime,
        closetime:  inputs.closeTime,
        speciality: selectedSpecialities,
        images: images
    });

    navigate("/"+res.data.id);
   }catch (err){
    console.log(err)
    setError("Could not add post");
   }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Hospital</h1>
        <div className="wrapper">
          {error && <span>{error}</span>}
            <p className="warning">Note: This data is uneditable, please ensure that you make no typing error</p>
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Hospital's name" required/>
            </div>
            <div className="item fullWidth">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" placeholder="Your address"  required/>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" placeholder="City"  required/>
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Email"  required/>
            </div>
            <div className="item">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="Main Number" minLength={10} maxLength={11} required/>
            </div>
            <div className="item">
              <label htmlFor="openTime">Open Time</label>
              <input id="openTime" name="openTime" type="time"  required/>
            </div>
            <div className="item">
              <label htmlFor="closeTime">Close Time</label>
              <input id="closeTime" name="closeTime" type="time" required/>
            </div>
            <div className="item fullwidth" >
                <label>Location</label>
                <Getlatlng />
            </div>
            <div className="item fullWidth">
              <label htmlFor="speciality">Speciality</label>
              <Multiselect
                className="select-speciality"
                options={specialityOptions}
                isObject={false}
                onSelect={setSelectedSpecialities}
                onRemove={setSelectedSpecialities}
                selectedValues={selectedSpecialities}
                showCheckbox
              />
            </div>
            <button className="sendButton">Add</button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
      {images.map((image, ind) => (
        <img src={image} alt="" key={ind}/>
      ))}
      <UploadImages uwConfig={{
              cloudName:"caredev",
              uploadPreset:"carecompass",
              multiple: true,
              folder: "hospital"
            }} 
            setState={setImages}/>
      </div>
    </div>
  );
}

export default NewHospitalPage;
