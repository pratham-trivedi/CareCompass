
import Home from "./routes/home/homePage"
import List from "./routes/listPage/listPage"
import  { Layout,RequireAuth } from "./routes/layout/layout";
import Login from "./routes/login/login"
import SinglePage from "./routes/singlePage/singlePage"
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom';
import Register from "./routes/register/Register";
import ProfilePage from "./routes/profilePage/ProfilePage";
import NewHospitalPage from "./routes/newHospitalPage/NewHospitalPage"
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import { singlePageLoader, listPageLoader , googleSinglePageLoader} from "./lib/loaders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />} >
      <Route path="/" element={<Home />} />
      <Route path="/list" loader={listPageLoader} element={<List />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addhospital" element={< NewHospitalPage />} />
      <Route path="/g/:id" loader={googleSinglePageLoader} element={<SinglePage />} />
      <Route path="/:id" loader={singlePageLoader} element={<SinglePage />} />
    </Route>
    <Route path="/" element={<RequireAuth />} >
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/update" element={<ProfileUpdatePage />} />
     </Route>
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router}/>
)
}

export default App