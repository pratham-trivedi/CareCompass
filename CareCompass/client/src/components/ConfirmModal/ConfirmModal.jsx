import React from 'react'
import "./ConfirmModal.css"
import apiRequest from '../../lib/apiRequest'
import { useNavigate } from 'react-router-dom'


function ConfirmModal({closeReview, onClose, hospital}) {

    const navigate = useNavigate();

    const handleDelete = async () => {
        await apiRequest.delete("/review/remove", {hospitalId : hospital.id});
        closeReview();
        navigate(`/${hospital.id}`);
        onClose();
    }   

  return (
    <div className='backgrnd'>
        <div className='modalContain'>
            <h1 classname="modalText">Are you sure you  want to Delete your Review</h1>
        <div className="btns">
            <button className='yesBtn' onClick={handleDelete}>Yes</button>
            <button className='noBtn' onClick={onClose}>No</button>
        </div>
        </div>
    </div>
  )
}

export default ConfirmModal