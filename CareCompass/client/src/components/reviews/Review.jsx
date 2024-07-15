import React from 'react'
import "./review.css"
import { reviewData } from '../../lib/dummudata';

function call_Query(item){
    return null;
}

function displayReview(item){
    return(
    <div className="reviewDetail">
        <p className='txt'>"{item.text}"</p>
        <p>Rating : {item.rate}</p>
        <p className='name'>{item.By}</p>
    </div>
    )
}

function Review({item}) {
  return (
    <div className="review">
    <h1>Total reviews: {reviewData.count}</h1>
    <div className="reviewCard">
        {reviewData.text.map((item) => (
            displayReview(item)
        ))}
    </div>
    </div>
  )
}

export default Review