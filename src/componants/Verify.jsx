import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom'
import * as yup from "yup"
import Loading from '../Loading'
import Resetpassword from './Resetpassword';
export default function Verify() {
  const [clicked,setClicked]=useState(false)
  const navigate= useNavigate();
  const verifyFormic=  useFormik({
    initialValues:{
      
     
      resetCode:""
      
  
    },
    onSubmit:function(values){
    setClicked(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
      .then((res)=>{
        // console.log(res);
    setClicked(false)
        navigate("/resetpassword")        
      })
      .catch((res)=>{
        // console.log(res)
    setClicked(false)
        toast.error("This didn't work.")
      })
    },
    validationSchema:yup.object().shape({
      resetCode:yup.string().required('reset code is required').min(6,'it must be 6 characters').max(6,'it must be 6 characters'),
    })
  })
    return (
      <div className='mx-5'>
      
  
  <form onSubmit={verifyFormic.handleSubmit} className="max-w-md mx-auto mt-28 ">

  
  
    <div className="relative z-0 w-full mb-5 group">
      <input value={verifyFormic.values.resetCode} onBlur={verifyFormic.handleBlur} onChange={verifyFormic.handleChange} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
      <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset code</label>
    </div>
    {verifyFormic.errors.resetCode&&verifyFormic.touched.resetCode?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"></span>{verifyFormic.errors.resetCode}
  </div>:''}
  
  
  
    
    
  
  
      
    
    
    <button type="submit" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800">
    {clicked?<Loading color={'#fff'} size={'24px'}/>:'verify'} 
    </button>
   
  </form>
  
  
      </div>
    )
}

