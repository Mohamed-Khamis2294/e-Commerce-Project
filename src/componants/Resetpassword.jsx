import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import Loading from '../Loading'
import Signin from './Signin';
export default function Resetpassword() {
  const [clicked,setClicked]=useState(false)
  const navigate= useNavigate();
  const resetFormic=  useFormik({
    initialValues:{
      
     
      email:"",
      newPassword:"",
      
  
    },
    onSubmit:function(values){
    setClicked(true)
      axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
      .then((res)=>{
        // console.log(res);
    setClicked(false)
        navigate("/signin")
        
      })
      .catch((res)=>{
        // console.log(res)
    setClicked(false)
        toast.error("This didn't work.")
      })
    },
    validationSchema:yup.object().shape({
      email:yup.string().required('email is required').email(),
      newPassword:yup.string().min(6,"must be at least 6 characters").max(12,'must not be more than 12 charcters').required('you must fill the password'),
    })
  })
    return (
      <>
      
  
  <form onSubmit={resetFormic.handleSubmit} className="max-w-md mx-auto mt-28 ">

  
  
    <div className="relative z-0 w-full mb-5 group">
      <input value={resetFormic.values.email} onBlur={resetFormic.handleBlur} onChange={resetFormic.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    </div>
    {resetFormic.errors.email&&resetFormic.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"></span>{resetFormic.errors.email}
  </div>:''}
  
    <div className="relative z-0 w-full mb-5 group">
      <input value={resetFormic.values.newPassword} onBlur={resetFormic.handleBlur} onChange={resetFormic.handleChange} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
      <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
    </div>
    
    {resetFormic.errors.password&&resetFormic.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"></span>{resetFormic.errors.password}
  </div>:''}
  
    
    
  
  
      
    
    
    <button type="submit" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800">
    {clicked?<Loading color={'#fff'} size={'24px'}/>:'Reset new password'} 
    </button>

  </form>
  
  
      </>
    )
}
