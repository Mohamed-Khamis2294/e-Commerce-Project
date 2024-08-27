import React, { useEffect, useState } from 'react'
import { Cartcontextobj } from './../context/Cartcontext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function Cart() {
  const{totalPrice,numItems,arrproducts,getCardProducts,updateProduct,deleteproduct,clearProducts,cartempty,cartId}=useContext(Cartcontextobj);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
getCardProducts();
setLoading(false)
  },[cartId])
  if(loading){
    return(
      <div className='w-full h-screen  flex justify-center items-center'>
      <Loading color={'#D03801'} size={'80px'}/>
    </div>
    )
  }
  return (<>
  {cartempty?<div className="bg-white mt-28 dark:bg-gray-800 border-2 border-orange-600 dark:border-orange-500 rounded-lg p-6 shadow-md flex items-center justify-center">
      <p className="text-orange-600 dark:text-orange-500 text-lg font-semibold">
        No items available
      </p>
    </div>:  <div className= " mt-28 mx-auto w-9/12">
   <button onClick={clearProducts} className='mx-auto bg-orange-600 p-2 rounded-md mb-2 text-white block '>clear all products</button>
    
  <p className='text-center text-orange-500 font-semibold mb-2'>Total price:${totalPrice}</p>
<div className=" flex justify-center   sm:rounded-lg">
  <table className=" w-2/12  sm:w-4/12  lg:w-6/12 text-sm text-center  text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th  scope="col" className="px-3 py-3 hidden sm:block">
          Product
        </th>
        <th scope="col" className="px-3 py-3">
          Qty
        </th>
        <th scope="col" className="px-3 py-3">
          Price
        </th>
        <th scope="col" className="px-3 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     {arrproducts?.map(p=> <tr key={p._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={p.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white  hidden sm:table-cell">
          {p?.product?.title?.split(' ').slice(0,2).join(' ')}
        </td>
        <td className="px-3 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProduct(p.product.id,p.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
             <span>{p.count}</span>
            </div>
            <button onClick={()=>updateProduct(p.product.id,p.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          ${p.price}
        </td>
        <td className="px-3 py-4">
          <button onClick={()=>deleteproduct(p.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
      </tr>)}
      
    </tbody>
  </table>
</div>

    <div className='flex'>
    <Link to={'/payment'} className={'mx-auto p-2 rounded-md text-white my-3 bg-orange-600'}>Go to Payment</Link>
    </div>
    </div>}
  
  </>

  )
}
