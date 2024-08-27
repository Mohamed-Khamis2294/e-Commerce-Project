import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import Loading from '../Loading'
import { Authcontextobj } from '../context/Authcontext'
import { Cartcontextobj } from '../context/Cartcontext'

export default function Signin() {
  const{}= useContext(Cartcontextobj)
  const{token,setToken}=useContext(Authcontextobj);
  const [clicked,setClicked]=useState(false)
  const navigate= useNavigate();
  const loginFormic=  useFormik({
    initialValues:{
      
     
      email:"",
      password:"",
      
  
    },
    onSubmit:function(values){
    setClicked(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      .then((res)=>{
        // console.log(res);
    setClicked(false);
    setToken(res.data.token)
    localStorage.setItem('tkn',res.data.token)
        navigate("/home")
        toast.success('Successfully Sign in!');
        
      })
      .catch((res)=>{
        // console.log(res)
    setClicked(false)
        toast.error("This didn't work.")
      })
    },
    validationSchema:yup.object().shape({
      email:yup.string().required('email is required').email(),
      password:yup.string().min(6,"must be at least 6 characters").max(12,'must not be more than 12 charcters').required('you must fill the password'),
    })
  })
    return (
      <>
      
  
  <form onSubmit={loginFormic.handleSubmit} className="max-w-md mx-auto mt-28 ">

  
  
    <div className="relative z-0 w-full mb-5 group">
      <input value={loginFormic.values.email} onBlur={loginFormic.handleBlur} onChange={loginFormic.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    </div>
    {loginFormic.errors.email&&loginFormic.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"></span>{loginFormic.errors.email}
  </div>:''}
  
    <div className="relative z-0 w-full mb-5 group">
      <input value={loginFormic.values.password} onBlur={loginFormic.handleBlur} onChange={loginFormic.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    </div>
    <p className='text-sm my-2'><Link to="/forgetpassword" className='text-orange-600 font-semibold'>Forget your password?</Link></p>
    {loginFormic.errors.password&&loginFormic.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium"></span>{loginFormic.errors.password}
  </div>:''}
  
    
    
  
  
      
    
    
    <button type="submit" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800">
    {clicked?<Loading color={'#fff'} size={'24px'}/>:'sign in'} 
    </button>
    <p className='text-sm mt-2'>Don't have an account ? <Link to="/register" className='text-orange-600 font-semibold'>Sign up</Link></p>
  </form>
  
  
      </>
    )
}
