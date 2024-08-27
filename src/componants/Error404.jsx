import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Authcontextobj } from '../context/Authcontext'

export default function Error404() {
  const {token,setToken}= useContext(Authcontextobj);
  useEffect(()=>{
    setToken(localStorage.getItem('tkn'));
    },[])
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="text-center p-6">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mt-4">Page Not Found</p>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        The page you are looking for does not exist.
      </p>
      <Link to="/home" className="mt-6 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
        Go Home
      </Link>
    </div>
  </div>
  )
}
