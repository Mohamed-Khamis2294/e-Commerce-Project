import React, { useContext, useEffect } from 'react'
import { Authcontextobj } from './context/Authcontext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const{token,setToken}=useContext(Authcontextobj);
  useEffect(()=>{
  setToken(localStorage.getItem('tkn'));
  },[])
  return (
    <>
    {localStorage.getItem('tkn')?<>{children}</>:<Navigate to={'/signin'}/>
    }
    </>    
  )
}
