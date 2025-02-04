import React from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'


export const AppLayout = () => {
  return (
    <main className='bg-amber-200 min-h-screen flex flex-col justify-between '>
        <Header/>
        <Outlet/>
        <Footer/>
  </main>
  )
}
