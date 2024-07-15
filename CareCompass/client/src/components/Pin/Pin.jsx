import React, { useState } from 'react'
import { InfoWindow, Marker } from '@vis.gl/react-google-maps'
import {Link} from 'react-router-dom';
import "./pin.css"

function open_now(val) {
    let currDate = new Date();
    if (currDate.getHours() >= parseInt(val.opentime) &&
      currDate.getHours() <= parseInt(val.closetime)) {
      return "open";
    }
    return "closed";
  }

function Pin ({hospital}){
    const [seeInfo, setSeeInfo] = useState(false);
    let pos = {lat: parseFloat(hospital.latitude), lng : parseFloat(hospital.longitude)};
    let status = open_now(hospital);
    let goto = hospital.Gid ? `/g/${hospital.Gid}` : `/${hospital.id}`;
    return(
        <>
        <Marker position={pos} onClick={() => {setSeeInfo(true); console.log("clicked")}}/>

        {seeInfo && ( 
            <InfoWindow position={pos} onCloseClick={() => setSeeInfo(false)} className='infoContainer'>
                <img src={hospital.images[0]} />
                <div className="text">
                <Link to={goto} > {hospital.name} </Link>
                <span>{status == 'open' ? "Open Now" : "Closed"}</span>
                </div>
            </InfoWindow>
        )}
        </>
    )
}

export default Pin
