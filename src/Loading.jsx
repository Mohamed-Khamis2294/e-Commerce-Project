import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function Loading({color,size}) {
  return (
    <>
    <Oval
  visible={true}
  height={size}
  width={size}
  color={color}
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </>
  )
}
