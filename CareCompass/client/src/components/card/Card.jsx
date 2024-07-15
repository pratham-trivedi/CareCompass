import React from 'react';
import "./Card.css";
import { Link } from 'react-router-dom';

function open_now(val) {

  if(val.isopen == true)return "open";
  else if(val.isopen == false) return "closed"; 

  let currDate = new Date();
  if (currDate.getHours() >= parseInt(val.opentime) &&
    currDate.getHours() <= parseInt(val.closetime)) {
    return "open";
  }
  return "closed";
}

function Card({ item }) {
  const status = open_now(item);

  const linkTo = item.Gid ? `/g/${item.Gid}` : `/${item.id}`;
  const linkText = item.name;
  return (
    <div className="card">
      <Link to={linkTo} className='imageContain'>
        <img src={item.images[0]} alt={item.name} />
      </Link>
      <div className="textContain">
        <h2 className='title'>
          <Link to={linkTo}>{item.name}</Link>
        </h2>
        <p className='address'>
          <span>{item.address}</span>
        </p>
        <p className={`status ${status}`}>{status === "open" ? "Open Now" : "Closed"}</p>
        <div className="below">
          <div className="rating">
            <span className='rating_text'>{item.rating}</span>
            <img src="/images/star.png" alt="Star" />
          </div>
          <button className="rate">
            <img src="/images/star_btn.png" alt="Rate" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;
