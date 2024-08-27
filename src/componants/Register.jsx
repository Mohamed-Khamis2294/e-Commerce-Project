import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import Loading from '../Loading'


export default function Register() {
  const [clicked,setClicked]=useState(false)
  const navigate= useNavigate();
const registerFormic=  useFormik({
  initialValues:{
    
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""

  },
  onSubmit:function(values){
    setClicked(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    .then((res)=>{
      // console.log(res);
    setClicked(false)
      navigate("/signin")
      toast.success('Successfully Sign up!');
    setClicked(false)
      
    })
    .catch((res)=>{
      // console.log(res)
      toast.error("This didn't work.")
      
    })
  },
  validationSchema:yup.object().shape({
    name:yup.string().min(8,'must be at least 8 charaters').required('name is required'),
    email:yup.string().required('email is required').email(),
    phone:yup.string().required("phone is required").matches(/^(20)?01[0125][0-9]{8}$/,'must be egyption phone number'),
    password:yup.string().min(6,"must be at least 6 characters").max(12,'must not be more than 12 charcters').required('you must fill the password'),
    rePassword:yup.string().required('you must confirm your password').oneOf([yup.ref('password')],'it must be like password')
  })
})
  return (
    <div className='mx-5'>
    

<form onSubmit={registerFormic.handleSubmit} className="max-w-md mx-auto mt-28 ">
  <div className="relative z-0 w-full mb-5 group">
    <input value={registerFormic.values.name} onBlur={registerFormic.handleBlur} onChange={registerFormic.handleChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
  </div>
{registerFormic.errors.name&&registerFormic.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"></span>{registerFormic.errors.name}
</div>:''}


  <div className="relative z-0 w-full mb-5 group">
    <input value={registerFormic.values.email} onBlur={registerFormic.handleBlur} onChange={registerFormic.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  {registerFormic.errors.email&&registerFormic.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"></span>{registerFormic.errors.email}
</div>:''}

  <div className="relative z-0 w-full mb-5 group">
    <input value={registerFormic.values.password} onBlur={registerFormic.handleBlur} onChange={registerFormic.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {registerFormic.errors.password&&registerFormic.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"></span>{registerFormic.errors.password}
</div>:''}

  <div className="relative z-0 w-full mb-5 group">
    <input value={registerFormic.values.rePassword} onBlur={registerFormic.handleBlur} onChange={registerFormic.handleChange} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">confirm password</label>
  </div>
  {registerFormic.errors.rePassword&&registerFormic.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"></span>{registerFormic.errors.rePassword}
</div>:''}

  <div className="relative z-0 w-full mb-5 group">
    <input value={registerFormic.values.phone} onBlur={registerFormic.handleBlur} onChange={registerFormic.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
  </div>
  {registerFormic.errors.phone&&registerFormic.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium"></span>{registerFormic.errors.phone}
</div>:''}
  
  <button type="submit" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800">
    {clicked?<div className='flex justify-center items-center w-full'>
    <Loading  size={'30px'}/>
  </div>:'sign up'} 
  </button>

  <p className='text-sm mt-2'>Already have an account ? <Link to="/signin" className='text-orange-600 font-semibold'>Sign in</Link></p>
</form>


    </div>
  )
}
