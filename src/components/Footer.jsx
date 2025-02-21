import React from 'react'

export const Footer = () => {
  return (
    <div className='font-medium p-3 sm:p-5 bg-slate-800 text-slate-50 text-center'>
      <h2>Made with love &hearts; Amirudheen Shareif </h2>
      <h4>&copy; {new Date().getFullYear()} Amirudheen Shareif. All rights reserved.</h4>
    </div>
  )
}
