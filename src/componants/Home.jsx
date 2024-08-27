import React from 'react'
import SliderFixed from './../SliderFixed';
import image4 from '../images/slider-2.jpeg'
import image5 from '../images/grocery-banner-2.jpeg'
import Products from './Products';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Error404 from './Error404';
import Loading from './../Loading';
import SliderCateg from './../SliderCateg';

export default function Home() {
  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
const{data,isError,isLoading,isSuccess}=  useQuery({
    queryKey:['categoriesSlider'],
    queryFn:getCategories
  })
  if(isError){
    return <>
    <Error404/>
    </>
  }
  if(isLoading){
    return <>
    <div className='flex h-screen w-full justify-center items-center'>
      <Loading color={"#D03801"} size={'80px'}/>
    </div>
    </>
  }
if(isSuccess){
  const categories=data.data.data;
  // console.log(categories);
  return (
    <>
    <div className='grid  grid-cols-12 gap-3 mt-28 mx-auto w-8/12 '>
      <div className='col-span-8  h-20'>
    <SliderFixed />
      </div>
      <div className='col-span-4  self-stretch'>
          <img className='h-24 sm:h-24 md:h-36 lg:h-48 object-cover' src={image4} alt="" />
          <img className='h-24 sm:h-24 md:h-36 lg:h-48  object-cover' src={image5} alt="" />
      </div>
    </div>
    <div className='container mx-auto mt-28'>
    <SliderCateg children={
      categories.map(p=><div key={p._id}>
      <img src={p.image} className='h-44 object-cover block mx-auto'/>
      <h3 className='text-center'>{p.name}</h3>
      </div>)
    }/>
    </div>

    <Products/>
    </>
  )
}
}
