import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Joblist } from './pages/Joblist';
import { Job } from './pages/Job';
import { MyJobs } from './pages/MyJobs';
import { SavedJobs } from './pages/SavedJobs';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {

  const router = createBrowserRouter([{
    element: <AppLayout/>,
    children:[
      {
      path: "/",
      element:<LandingPage/>
      },
      {
      path: "/joblist",
      element: <ProtectedRoute> <Joblist/> </ProtectedRoute> 
      },
      {
      path: "/job/:id",
      element: <ProtectedRoute> <Job/> </ProtectedRoute> 
      },
      {
      path: "/myjobs",
      element: <ProtectedRoute> <MyJobs/>  </ProtectedRoute>
      },
      {
      path: "/savedjobs",
      element: <ProtectedRoute> <SavedJobs/> </ProtectedRoute> 
      },
    ],
  }]);

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  

  return (
    <>
       <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
         <RouterProvider router={router}/>
        </ClerkProvider>
      
        
    </>
  )
}

export default App
