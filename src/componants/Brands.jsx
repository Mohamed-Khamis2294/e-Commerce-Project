import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import Loading from '../Loading'

export default function Brands() {
  const[brandname,setBrandName]=useState('')
  const[brandimage,setBrandimage]=useState('')
function getSpecificBrand(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  .then((res)=>{
    // console.log(res)
    setBrandName(res.data.data.name)
    setBrandimage(res.data.data.image)
  })
  .catch((res)=>console.log(res))
}
  // **********************
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    getSpecificBrand(id)
  };

  const handleClose = () => {
    setOpen(false);
  };


  // *************************
  function getBrands(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/brands',{
    params:{
      limit:10,
    }
  })
  }
  const{data,isError,isLoading,isSuccess}=useQuery({
    queryKey:['brands'],
    queryFn:getBrands
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

      <button onClick={()=>handleClickOpen(p._id)} key={p._id} className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <img className="p-8 rounded-t-lg block mx-auto" src={p.image} alt="product image" />
</button>

      )
    }
    {/* ****************** */}
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-black dark:bg-white p-6 rounded-lg shadow-lg ">
            <p className='text-orange-600 text-center font-semibold text-xl'>{brandname}</p>
            <img src={brandimage} alt="brandimage" />
            <button 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded block mx-auto" 
              onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    {/* ****************** */}
    </div>
  )
}
}
