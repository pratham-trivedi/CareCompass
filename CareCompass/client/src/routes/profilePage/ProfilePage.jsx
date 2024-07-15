
import List from '../../components/list/List'
import Review from '../../components/reviews/Review'
import "./ProfilePage.css"
import apiRequest from "../../lib/apiRequest"
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function ProfilePage() {

    const navigate = useNavigate();

    const {currentUser,updateUser} = useContext(AuthContext);

    const handleLogout = async () => {
        try {
          await apiRequest.post("/auth/logout");
          updateUser(null);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className="profilePage">
        <div className="details">
            <div className="title">
                <h1>User Information</h1>
                <Link to="/profile/update" ><button>Update Profile</button> </Link>
            </div>
            <div className="info">
                <span>Name : <b>{currentUser.name} </b></span>
                <span>Username : <b>{currentUser.username} </b></span>
                <span>E-mail : <b>{currentUser.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="saved">
                <h1>Saved Posts</h1>
                <List />
            </div>
            <div className="reviews">
                <h1>My Reviews</h1>
                <Review />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage