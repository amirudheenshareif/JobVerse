import React from 'react'
import { Button } from './ui/button'
import logo from '../assets/logo-jobverse.png'
import { SignIn ,SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useState } from 'react';
import { BriefcaseBusiness, Heart } from 'lucide-react';


export const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      <div className='flex justify-between items-center p-8 text-amber-100'>
        <div>
          <img src={logo} alt="logo" className='h-10' />
        </div>
        
    {/*SignedOut component use: Indicates the components that should render
      when user is not logged in /signedin.
      In this case it is the Button componenet */}

     <SignedOut>
        <Button variant="outline" className="bg-amber-900 text-amber-100 mt-1 px-8 py-5"
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
          <UserButton.MenuItems> 
             <UserButton.Link label="My Jobs" href="/myjobs" labelIcon={<BriefcaseBusiness/>} />
             <UserButton.Link label="Saved Jobs" href="/savedjobs"  labelIcon={<Heart/>} />
           </UserButton.MenuItems>
        </UserButton>

      </SignedIn>

      </div>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center "
          // onClick={handleOverlayClick}
        >
          {/* This SignIn component is the actual form model that appears */}
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  )
}
