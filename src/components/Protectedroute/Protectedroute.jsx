import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Protectedroute({children}) {

if(localStorage.getItem('userTokens')){
    return <div>{children}</div>;
}

  else {
    return <><Navigate to='/login'></Navigate></>;
  }
}
