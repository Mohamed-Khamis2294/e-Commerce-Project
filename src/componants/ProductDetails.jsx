import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Error404 from './Error404';
import Loading from '../Loading';
import { Cartcontextobj } from '../context/Cartcontext';
export default function ProductDetails() {
  const{addToCart,loading}=useContext(Cartcontextobj);
  const{id}=useParams()
  function getproductDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  const {data,isError,isLoading,isSuccess}=useQuery({
    queryKey:['product details'],
    queryFn:getproductDetails
  })
  if(isError){
    return(
      <Error404/>
    ) 
  }
  if(isLoading){
    return (
      <div className='w-full h-screen  flex justify-center items-center'>
        <Loading color={'#D03801'} size={'80px'}/>
      </div>
    )
  }
  if(isSuccess){
  let arr=data.data.data;
  // console.log(arr);
    return (
      

<div className="flex mx-auto flex-col mt-28 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
  <img className="object-cover  rounded-t-lg   md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={arr.imageCover} alt={arr.title} />
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{arr.title}</h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{arr.description
}</p>
<button onClick={()=>addToCart(arr._id)} className='bg-orange-600 rounded-md p-2 text-white mt-8 text-center '>
  {loading? <div className='flex justify-center items-center w-full'>
    <Loading  size={'30px'}/>
  </div>:'Add to cart'}
  </button>
  </div>
</div>
      )
    }
}
