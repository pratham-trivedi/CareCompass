import "./searchBar.css"
import React, { useState } from 'react'
import Getlatlng from "../getlatlng/Getlatlng";
import {Link, useNavigate} from "react-router-dom"

function Search_Form({setState, query}) {

const handleChange = e => {
    setState(prev=>({...prev, [e.target.name] : e.target.value}));
    console.log(query);
}

    return (
    <form>
        <input type="text" name="city" placeholder="City Location" onChange={handleChange} required/>
        <input type="number" name="range" min={500} max={10000}placeholder="Range*" onChange={handleChange}/>
        <Link to={`/list?city=${query.city}&range=${query.range}`}>
        <button>
            <img src="/images/search.png" alt="" />
        </button>
        </Link>
        
    </form>
    )
}

function Locate_Form() {

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const latitude = e.target.latitude.value;
        const longitude = e.target.longitude.value;
        const range = e.target.range.value;
        navigate(`/list?latitude=${latitude}&longitude=${longitude}&range=${range}&city=`);
    }

    return (
        <form onSubmit={handleSubmit}>
        <Getlatlng />
        <input type="number" name="range" min={500} max={10000}placeholder="Range*" required/>
        <button>
            <img src="/images/search.png" alt="" />
        </button>
    </form>
    )
}

const types = ["Search", "Locate"];

function searchBar() {
    const [query, setQuery] = useState({
        type: "Search",
        city: "",
        range: "500",
        latitude: "",
        longitude: "",
    })


 const switchType = (val) => {
    setQuery(prev=>({...prev, type: val}));
 }

  return (
    <div className="searchBar">
        <div className="type">
            {types.map((type) => (
                <button key={type} onClick={() => {
                    switchType(type);}} 
                    className={query.type == type ? "active" : ""}>
                    {type}
                    </button>
            ))}
        </div>
        {query.type == "Search" ? 
            (<Search_Form setState={setQuery} query={query}/>) :
            (<Locate_Form />)
        }
        <span className='meter-info'>*in meters</span>
    </div>
  )
}

export default searchBar