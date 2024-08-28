import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../Loading'
import Error404 from './Error404'
// import { Cartcontextobj } from '../context/Cartcontext';

export default function Allorders() {
  // const{cartowner}=useContext(Cartcontextobj);
  // console.log(cartowner)
  // const[any,setAny]=useState(false)
  function getorders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${       localStorage.getItem('owner')
  }`)
  }
  const{data,isError,isLoading,isSuccess}=useQuery({
    queryKey:['orders'],
    queryFn:getorders
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
    // console.log(data.data);
    return (
      <div className="container mt-28 mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-orange-600 dark:text-orange-400">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-600 dark:bg-orange-500 text-white text-xs md:text-sm lg:text-base">
              <th className="p-2 md:p-4">Order Date</th>
              <th className="p-2 md:p-4">Total Price</th>
              <th className="p-2 md:p-4">Payment Method</th>
              <th className="p-2 md:p-4">Payment Status</th>
              <th className="p-2 md:p-4">Delivery Status</th>
              <th className="p-2 md:p-4">Number of Items</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((order) => (
              <tr
                key={order._id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs md:text-sm lg:text-base"
              >
                <td className="p-2 md:p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-2 md:p-4">{order.totalOrderPrice} USD</td>
                <td className="p-2 md:p-4 capitalize">{order.paymentMethodType}</td>
                <td className="p-2 md:p-4">
                  {order.isPaid ? (
                    <span className="text-green-600 dark:text-green-400">Paid</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">Not Paid</span>
                  )}
                </td>
                <td className="p-2 md:p-4">
                  {order.isDelivered ? (
                    <span className="text-green-600 dark:text-green-400">Delivered</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">Not Delivered</span>
                  )}
                </td>
                <td className="p-2 md:p-4">{order.cartItems.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}
