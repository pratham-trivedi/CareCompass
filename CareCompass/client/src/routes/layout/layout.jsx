import React from 'react'
import Nav from "../../components/Navbar/Navbar"
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import "./layout.css"
import "./responsive.css"

function Layout() {
    return (
        <div className="Layout">
            <div className="navbar">
                <Nav />
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}

function RequireAuth() {
    const { currentUser } = useContext(AuthContext);
  
    if (!currentUser) return <Navigate to="/login" />;
    else {
      return (
        <div className="Layout">
          <div className="navbar">
            <Nav />
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      );
    }
  }

export {Layout, RequireAuth};