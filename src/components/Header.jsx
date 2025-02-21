import React, { useEffect } from 'react'
import { Button } from './ui/button'
import logo from '../assets/jobverse-logo.png'
import { SignIn ,SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useState } from 'react';
import { BriefcaseBusiness, Heart } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';


export const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);
  const[search,setSearch] = useSearchParams(); // used to search params in url
  const navigate = useNavigate();

  useEffect(()=>{
    if(search.get("sign-in")){ // searches whether url has a queryParams sign-in=true
      setShowSignIn(true); //Modal appears
      setSearch({}) // after that search state is set empty
    }
  },[search])

  const handleOverlayClick = (e)=>{
     if(e.target===e.currentTarget){
        setShowSignIn(false);
     }
  }

  return (
    <>
      <div className='flex justify-between items-center p-8 text-amber-100'>
        <div>
          <img src={logo} alt="logo"
               className='h-8 sm:h-10 md:h-12  '
               onClick={()=>{navigate("/")}} />
        </div>
        
    {/*SignedOut component use: Indicates the components that should render
      when user is not logged in /signedin.
      In this case it is the Button componenet */}

     <SignedOut>
        <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 mt-1 px-4 py-2 sm:px-6 sm:py-4"
        onClick={() => setShowSignIn(true)}>
          Login
        </Button>
      </SignedOut>

       {/*SignedIn component use: Indicates the components that should render
      when user is logged in /signedin. In this case it is the UserButton componenet */}
      <SignedIn>

      {/* Dropdown appears when this button is clicked */}
        <UserButton >
          {/* The actual dropdown that appears. || Required Links are added in this component  */}
          <UserButton.MenuItems > 
             <UserButton.Link label="My Jobs" href="/myjobs" labelIcon={<BriefcaseBusiness/>} />
             <UserButton.Link label="Saved Jobs" href="/savedjobs"  labelIcon={<Heart/>} />
           </UserButton.MenuItems>
        </UserButton>

      </SignedIn>

      </div>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center "
          onClick={handleOverlayClick}
        >
          {/* This SignIn component is the actual form model that appears */}
          <SignIn
            signUpForceRedirectUrl="/"
            fallbackRedirectUrl="/"
          />
        </div>
      )}
    </>
  )
}
