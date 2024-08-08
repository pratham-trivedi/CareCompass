import React, { useState } from 'react';
import './ReviewModal.css';
import apiRequest from '../../lib/apiRequest';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useNavigate } from 'react-router-dom';

function ReviewModal({ onClose, hospital, setReviewed}) {

  const editMode = hospital.userReview ? true : false;

  const navigate = useNavigate();
  const [rating, setRating] = useState(editMode ? hospital.userReview.rating : 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState(editMode ? hospital.userReview.ratingText : '');
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const handleStarClick = (index) => {
    setError('');
    setRating(index + 1);
  };

  const handleStarMouseEnter = (index) => {
    setHoverRating(index + 1);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  const handleTextChange = (e) => {
    setError('');
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = async () => {
    if (rating === 0 || text.trim() === '') {
      setError("Please Fill out fields")
      return;
    }
    
    try{
      setIsClicked(true);
      //if(hospital.Gid){
      //await apiRequest.post("/googledata/save", {hospitalId: hospital.Gid})
      //}else{
      await apiRequest.post("/review/add", {hospitalId: hospital.id, rating: rating, ratingText: text})
      //}   
    }catch(err) {
      console.log(err);
    }
    setReviewed(true);
    navigate(`/${hospital.id}`);
    onClose();
  };

  const handleDelete = () => {
    setShowConfirmModal(true);
  }

  return (
    <div className='backgrnd'>
      {showConfirmModal && <ConfirmModal closeReview={onClose} onClose={() => setShowConfirmModal(false)} hospital={hospital}/>}
      <div className='modalContain'>
        <button className='close' onClick={onClose}>X</button>
        <h1 className='modalText'>Your Feedback Matters...</h1>
        <div className='stars'>
          {[...Array(5)].map((star, index) => (
            <span
              key={index}
              className={`star ${(index < (hoverRating || rating)) ? 'filled' : ''}`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarMouseEnter(index)}
              onMouseLeave={handleStarMouseLeave}
            >
              &#9733;
            </span>
          ))}
        </div>
        <textarea
          className='reviewInput'
          value={text}
          onChange={handleTextChange}
          maxLength={150}
          placeholder='Write your review here...'
        />
        <div className='charCount'>
          {charCount}/150
        </div>
        <div className="buttons">
        <button disabled={isClicked} className='submitBtn' onClick={handleSubmit}>Submit</button>
        {editMode && (<button className='deleteBtn' onClick={handleDelete}> Delete </button>)}
        </div>
        <div className='error'>{error}</div>
      </div>
    </div>
  );
}

export default ReviewModal;
