import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => { // Children are components that are wrapped with this ProtectedRoute Component
     const{isLoaded,isSignedIn} = useUser();

     if(isLoaded && !isSignedIn){ // checks whether clerk is loaded and user has signed in or not
        return <Navigate to="/?sign-in=true" />;  // if haven't signed in navigated to homepage with a queryParam of sign-in=true
     }

  return children;
}
