import React, { createContext, useState } from 'react'
export const Authcontextobj= createContext()
export default function Authcontext({children}) {
  const [token,setToken]=useState(null)
  return (
    <>
    <Authcontextobj.Provider value={{token,setToken}}>
    {children}
    </Authcontextobj.Provider>
    </>
  )
}
