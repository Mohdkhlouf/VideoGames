import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import Games from './components/Games/Games.jsx'
import jwt from "jwt-decode";
import Cart from './components/Cart/Cart.jsx'
import Protectedroute from './components/Protectedroute/Protectedroute.jsx'
import Category from './components/Category/Category.jsx'
import News from './components/News/News.jsx'





export default function App() {
 
  


    
let [user,setUser]=useState(null);


function saveUserData(){
  let token=localStorage.getItem('userTokens');
  let decoded=jwt(token);
  setUser(decoded);
  }



  useEffect(()=>{
    if(localStorage.getItem('userTokens')){
      saveUserData();
    }

  },[])


  let routers=createBrowserRouter([
    {path:'',element:<Layout user={user} setUser={setUser}/>,children:[
        {index:true,element:<Home />},
        {path:'games',element:<Games />},
        {path:'news',element:<News />},
                {path:'register',element:<Register />},
        {path:'cart',element:<Protectedroute><Cart /></Protectedroute>},
        {path:'login',element:<Login userData={saveUserData} />},
        {path:'*',element:<NotFound />}

  ]}



])

  return (
    <RouterProvider router={routers}></RouterProvider>
  )
}
