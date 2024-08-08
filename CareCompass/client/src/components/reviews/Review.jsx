import React from 'react'
import "./review.css"
import { reviewData } from '../../lib/dummudata';


function displayReview(item, profileReview){
  const reviewText = item.text? item.text : item.ratingText;
  const author = item.author ? item.author : item.user.name;
  const name = item.hospital ? item.hospital.name : '';
    return(
    <div className="reviewDetail">
      {profileReview && <h1>{name}</h1>}
        <p className='txt'>"{reviewText}"</p>
        <p>Rating : {item.rating}</p>
        <p className='name'>{author}</p>
    </div>
    )
}

function Review({review, profileReview = false}) {
  
  const reviewDisp = [...review].reverse();

  console.log(review[0]);
  
  return (
    <div className="review">
    <h1>Total reviews: {reviewDisp.length}</h1>
    <div className="reviewCard">
        {reviewDisp.map((item) => (
            displayReview(item, profileReview)
        ))}
    </div>
    </div>
  )
}

export default Review