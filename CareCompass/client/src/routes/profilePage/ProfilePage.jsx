
import List from '../../components/list/List'
import Review from '../../components/reviews/Review'
import "./ProfilePage.css"
import apiRequest from "../../lib/apiRequest"
import { Link, useNavigate, useLoaderData, Await } from 'react-router-dom';
import { Suspense, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { reviewData } from '../../lib/dummudata';


function ProfilePage() {

    const navigate = useNavigate();

    const {currentUser,updateUser} = useContext(AuthContext);
    const data = useLoaderData();

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

                <Suspense fallback={<p>Loading...</p>}>
            <Await 
            resolve={data.postResponse}
            errorElement={<p>Something went wrong</p>} >
              
            {(postResponse) => {
              console.log(postResponse.userReview);
              if(postResponse.savedHospital.data.length != 0){
              return (
                <>
              <div className="saved">
              <h1>Saved Hospitals</h1>
              <List listData={postResponse.savedHospital.data}/>
              </div>
              <div className="reviews">
                <h1>My Reviews</h1>
                <Review review={postResponse.userReview.data} profileReview={true} />
            </div>
              </>
          )}else{
            return(
            <p>You have not saved any Hospitals</p>
          )}
          
          }}
          </Await>
          </Suspense>
        </div>
    </div>
  )
}

export default ProfilePage