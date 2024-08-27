import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Cartcontextobj } from '../context/Cartcontext';
import { useFormik } from 'formik';

export default function Payment() {
  const baseUrl = window.location.origin;
  const[isonline,setisonline]=useState(true);
  const{cartId,clearProducts}=useContext(Cartcontextobj);
  // console.log(baseUrl);
  const paymentFormic=useFormik({
    initialValues:{
      shippingAddress:{
        details: "",
        phone: "",
        city: ""
        }
    },
    onSubmit:function(values){
      handlepayment(values)
    }
  })
// if(process.env.NODE_ENV==='production'){
//   console.log('koko prod');
// }else{
//   console.log('koko dev');
// }
function cashOrder(values){
axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{
  headers:{
    token:localStorage.getItem('tkn')
  }
})
.then((res)=>console.log(res))
.catch((res)=>console.log(res))
}
function onlineOrder(values){
axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,values,{
  headers:{
    token:localStorage.getItem('tkn')
  },params:{
    url:baseUrl
  }
})
.then((res)=>{
  // console.log(res)
  window.location.href=res.data.session.url;
})
.catch((res)=>console.log(res))
}
function handlepayment(values){
  if(isonline){
onlineOrder(values);
clearProducts()
}else{
  cashOrder(values);
  clearProducts()
  }
}

  return (
    <div className='mt-28'>
      

<form onSubmit={paymentFormic.handleSubmit} className="max-w-sm mx-auto">
  <div className="mb-5">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
    <input value={paymentFormic.values.shippingAddress.details} onChange={paymentFormic.handleChange} onBlur={paymentFormic.handleBlur} type="text" id="details"  name="shippingAddress.details" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 dark:shadow-sm-light" placeholder="" required />
  </div>
  <div className="mb-5">
    <label value={paymentFormic.values.shippingAddress.phone} onChange={paymentFormic.handleChange} onBlur={paymentFormic.handleBlur} htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input type="tel" id="phone"  name="shippingAddress.phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 dark:shadow-sm-light" required />
  </div>
  <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
    <input value={paymentFormic.values.shippingAddress.city} onChange={paymentFormic.handleChange} onBlur={paymentFormic.handleBlur} type="text" id="city"  name="shippingAddress.city" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 dark:shadow-sm-light" required />
  </div>
 
  <button onClick={()=>setisonline(false)} type="submit" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Cash order</button>
  <button onClick={()=>setisonline(true)} type="submit" className="ml-3 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Online order</button>
</form>


    </div>
  )
}
