import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
export const wishContextobj =createContext()
export default function Wishcontext({children}) {
  const[wisharray,setWisharray]=useState(()=>{
    const storedWishAraay= localStorage.getItem('wisharray')
   return storedWishAraay?JSON.parse(storedWishAraay):[]
  })

  const [inWishlist, setInWishlist] = useState(() => {
    // Initialize state from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : {};
  });
    // Load wishlist from localStorage when the context initializes
    useEffect(() => {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
          setInWishlist(JSON.parse(storedWishlist));
      }
  }, []);

  // Function to update localStorage whenever wishlist changes
  useEffect(() => {
      localStorage.setItem('wishlist',JSON.stringify(inWishlist));
  }, [inWishlist]);
  // ********************************
  function addToWishlist(id){
    axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
      productId: id
    },{
      headers:{
        token:localStorage.getItem('tkn')
      }
    }).then((res)=>{
      // console.log(res)
      setInWishlist((prev)=>({
        ...prev,
        [id]:true,
      }))
  localStorage.setItem('wishlist', JSON.stringify(inWishlist));
  toast.success(res.data.message)
    })
      .catch((res)=>console.log(res))
  }
  function removeFromlist(id){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
      headers:{
        token:localStorage.getItem('tkn')
      }
    }).then((res)=>{
      // console.log(res)
      setInWishlist((prev)=>({
        ...prev,
        [id]:false,
      }))
      localStorage.setItem('wisharray',JSON.stringify(res.data.data))
      setWisharray(JSON.parse(localStorage.getItem('wisharray')))
  toast.success(res.data.message)
  getWishlist(id)
    })
    .catch((res)=>console.log(res))
  }
function handlewishlist(id){
if(inWishlist[id]){
  removeFromlist(id)
}else{
  addToWishlist(id);
}
}
function getWishlist(){
  axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
    headers:{
      token:localStorage.getItem('tkn')
    }
  }).then((res)=>{
    // console.log(res)
    localStorage.setItem('wisharray',JSON.stringify(res.data.data))
    setWisharray(JSON.parse(localStorage.getItem('wisharray')))
  })
    .catch((res)=>console.log(res))
}
  return (
    <>
    <wishContextobj.Provider value={{handlewishlist,inWishlist,getWishlist,wisharray,removeFromlist}}>
      {children}
    </wishContextobj.Provider>
    </>
  )
}
