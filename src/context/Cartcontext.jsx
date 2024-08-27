import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
export const Cartcontextobj=createContext();
export default function Cartcontext({children}) {
  const[numItems,setNumItems]=useState(0);
  const[totalPrice,setTotalPrice]=useState(0);
  const[arrproducts,setArrProducts]=useState(null);
  const[loading,setLoading]=useState(false);
  const[checkid,setCheckid]=useState('');
  const[cartempty,setcartempty]=useState(true);
  const[cartId,setCartId]=useState(null);
  const[cartowner,setCartowner]=useState(null);
  function reset(res){
    localStorage.setItem('items',res.data.numOfCartItems)
    setNumItems(localStorage.getItem('items'))
    setTotalPrice(res.data.data.totalCartPrice)
    setArrProducts(res.data.data.products)
    setCartId(res.data.data._id)
    setCartowner(res.data.data.cartOwner)
  }
  const token=localStorage.getItem('tkn');
  // **********************
  function addToCart(id){
    setLoading(true)
    setCheckid(id)
    axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
      productId: id
    },{
      headers:{
        token,
      }
    })
    .then((res)=>{
      // console.log(res)
    toast.success(res.data.message);
    setLoading(false)
    reset(res);
    setcartempty(false);
    }
    )
    .catch((res)=>{
      // console.log(res)
    toast.error(res.data.message)
    setLoading(false)
    })
  }
  // **********************
  function getCardProducts(){
    axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token,
      }
    }).then((res)=>{
      // console.log(res);
      if(res.data.numOfCartItems===0){
        clearProducts();
      }else{
        reset(res);
        // console.log(res.data.data._id);
      //  console.log(cartId);
      //  console.log(cartowner);
       localStorage.setItem('owner',res.data.data.cartOwner)
        setcartempty(false);
      }
    })
    .catch((res)=>{
      console.log(res)
      
    })
  }
  // **********************
  function updateProduct(id,newCount){
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count: newCount
    },{
      headers:{
        token,
      }
    }).then((res)=>{
      // console.log(res);
      if(newCount===0){
        deleteproduct(id)
      }
      reset(res);
      if(res.data.numOfCartItems===0){
        clearProducts();
      }

    })
    .catch((res)=>console.log(res))
  }
  // **********************
  function deleteproduct(id){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:{
        token,
      }
    }).then((res)=>{
      // console.log(res)
      reset(res);
      if(res.data.numOfCartItems===0){
        clearProducts();
      }
    })
    .catch((res)=>console.log(res))
  }
  // **********************
  function clearProducts(){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:{
        token,
      }
    }).then((res)=>{
      // console.log(res)
      localStorage.setItem('items',0)
      setNumItems(localStorage.getItem('items'))
      setTotalPrice(0)
      setArrProducts(null)
      setcartempty(true)
    })
    .catch((res)=>console.log(res))
  }
  // **********************
  return (
    <Cartcontextobj.Provider value={{addToCart,totalPrice,numItems,arrproducts,loading,checkid,getCardProducts,updateProduct,deleteproduct,clearProducts,cartempty,cartId,cartowner}}>
      {children}
    </Cartcontextobj.Provider>
  )
}
