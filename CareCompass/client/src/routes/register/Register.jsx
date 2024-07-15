import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";


function Register() {
  const [error, setError] = useState("");
  const [isLoaing, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try{
    const res = await apiRequest.post("/auth/register", {
      name,
      username, 
      email, 
      password
    })

    navigate("/login");
  }catch(err){
    setError(err.response.data.message);
  }finally{
    setIsLoading(false);
  }

  }

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handlesubmit}>
          <h1>Create an Account</h1>
          <input name="name" type="text" placeholder="Name" />
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoaing}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
