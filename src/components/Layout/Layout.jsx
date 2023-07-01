import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'


export default function Layout({user,setUser}) {
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('userTokens');
    setUser(null);
    navigate('/Login');
  }

  return (
    <>
    <div className="container">
    <Navbar user={user}  logOut={logOut}/>
            
                <Outlet></Outlet>
           

    <Footer/>
    </div>
    </>

  )
}
