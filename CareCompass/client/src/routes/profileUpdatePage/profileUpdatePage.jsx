
import "./profileUpdatePage.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js"
import {useNavigate} from "react-router-dom";

function ProfileUpdatePage() {
    
    const navigate= useNavigate();
    const { currentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
  
      const { name, username, email, password } = Object.fromEntries(formData);
  
      try {
        const res = await apiRequest.put(`/users/${currentUser.id}`, {
          name,
          username,
          email,
          password,
        });
        updateUser(res.data);
        navigate("/profile");
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      }
    };
  

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form  onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={currentUser.name}
            />
          </div>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>Error</span>}
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;