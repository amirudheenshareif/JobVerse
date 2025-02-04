import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Onboarding } from './pages/Onboarding';
import { Joblist } from './pages/Joblist';
import { Job } from './pages/Job';
import { MyJobs } from './pages/MyJobs';
import { SavedJobs } from './pages/SavedJobs';
import { SignedIn } from '@clerk/clerk-react';

function App() {

  const router = createBrowserRouter([{
    element: <AppLayout/>,
    children:[
      {
      path: "/",
      element:<LandingPage/>
      },
      {
      path: "/onboarding",
      element:<Onboarding/>
      },
      {
      path: "/joblist",
      element:<SignedIn> <Joblist/> </SignedIn>
      },
      {
      path: "/job/:id",
      element:<SignedIn> <Job/> </SignedIn>
      },
      {
      path: "/myjobs",
      element:<SignedIn> <MyJobs/> </SignedIn>
      },
      {
      path: "/savedjobs",
      element:<SignedIn> <SavedJobs/> </SignedIn>
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
