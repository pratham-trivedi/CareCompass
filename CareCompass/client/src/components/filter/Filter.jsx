import React from 'react'
import {speciality} from "../../lib/dummudata/"
import "./filter.css"
import {useSearchParams} from "react-router-dom";
import {useState} from 'react';

const speciality_Data = speciality;

function Filter() {

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    city : searchParams.get("city") || "",
    speciality : "Hospital",
    status : "any",
    range: searchParams.get("range") || "",
  });

  const handleFilter = () => {
    setSearchParams(query);
  }

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name] : e.target.value
    })
  };

  return (
    <div className="filter">
      <h1>Search for Hospitals ...</h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input type="text" id="city" name="city" placeholder='Location' onChange={handleChange} defaultValue={query.city}/>
        </div>
      </div>
      <div className="bottom">
      <div className="item">
          <label htmlFor="speciality">Speciality</label>
          <select name="speciality" id="speciality" onChange={handleChange}>
            {speciality_Data.map(item => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="item">
          <label htmlFor="status">Status</label>
          <select name="status" id="status" onChange={handleChange} defaultValue={"any"}>
            <option value="open">Open Now</option>
            <option value="any">Any</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="range">Range (in meters)</label>
          <input type="number" name="range" min={500} max={10000}placeholder="Range" onChange={handleChange} defaultValue={query.range}/>
        </div>
        <button onClick={handleFilter}>
          <img src="/images/search.png" alt="" />
        </button>
      </div>
    </div>
  )
}

export default Filter