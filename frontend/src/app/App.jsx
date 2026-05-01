import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '../app.route.jsx'

const App = () => {
  const {getMe}=useAuth()
  useEffect(()=>{
     getMe();
  },[])
  return (
     <RouterProvider router={router} />
  )
}

export default App