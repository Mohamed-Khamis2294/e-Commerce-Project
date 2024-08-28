import React, { useContext, useEffect, useState } from 'react'
import { wishContextobj } from '../context/Wishcontext'
import { Cartcontextobj } from '../context/Cartcontext'
import Loading from '../Loading';

export default function Wishlist() {
  const{addToCart}=useContext(Cartcontextobj);
  const{getWishlist,wisharray,removeFromlist}=useContext(wishContextobj);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    getWishlist();
    setLoading(false);
  },[])
  if(loading){
    return(
      <div className='w-full h-screen  flex justify-center items-center'>
      <Loading color={'#D03801'} size={'80px'}/>
    </div>
    )
  }
  
   if (wisharray.length===0){

    return <div className="bg-white mt-28 dark:bg-gray-800 border-2 border-orange-600 dark:border-orange-500 rounded-lg p-6 shadow-md flex items-center justify-center">
    <p className="text-orange-600 dark:text-orange-500 text-lg font-semibold">
      No items available
    </p>
  </div>

   }
  
  return (
    <div className='mt-28 container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
    

{wisharray.map(p=><div key={p._id} className="mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

<img className="rounded-t-lg w-6/12 block mx-auto" src={p.imageCover} alt='wish-img' />

<div className="p-5">
<a href="#">
  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{p.title?.split(' ').slice(0,2).join(' ')}</h5>
</a>
<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
<button onClick={()=>addToCart(p._id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
  Add to cart
</button>
<button onClick={()=>removeFromlist(p._id)} className="ms-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
  Remove from wish list
</button>
</div>
</div>)}


    </div>
  )
}
