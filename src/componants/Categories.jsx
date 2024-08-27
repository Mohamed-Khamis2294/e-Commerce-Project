import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../Loading'

export default function Categories() {
  function getCateg(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const{data,isError,isLoading,isSuccess}=useQuery({
      queryKey:['categPage'],
      queryFn:getCateg
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
      const arrayBrands=data.data.data;
      // console.log(arrayBrands);
    return (
      <div className='mt-28 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
      {
        arrayBrands.map((p)=>
  
        <div key={p._id} className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="p-8 rounded-t-lg block mx-auto h-96 object-cover" src={p.image} alt="product image" />
      <p className='text-center font-bold text-3xl mb-4'>{p.name}</p>
  </div>
  
        )
      }
      </div>
    )
  }
  }
