import React from 'react'
import { useEffect } from 'react'
import { Button } from '../components/ui/button'
import landingPageImg from '../assets/landing-page-img.png'
import { Card, CardHeader, CardTitle,CardDescription } from '../components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import faqData from '../apis/faq.json'


export const LandingPage = () => {

  const{user} = useUser();
  useEffect(() => {
    if (user) {
      console.log(user.id);
    } else {
      console.log('guest');
    }
  }, [user]);
  
  return (
   <>
   <div className='mt-20 flex flex-col items-center justify-center '>
      <h1 className='mb-5 text-center text-3xl sm:text-4xl md:text-5xl font-bold '>Discover Your Next Career Move with JobVerse.</h1>
      <h2 className='mt-6 text-center text-2xl sm:text-3xl md:text-4xlfont-medium'>Find. Post. Connect. – Your Job Search, Simplified</h2>
      <div className='mt-10 px-8  flex justify-center gap-8' >
      <Link to='/joblist' >
      <Button variant="outline" className = 'font-bold border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white mt-1 px-9 py-6 sm:px-12 sm:py-9' >Find Jobs</Button>
      </Link>
      {/* <Link to='/onboarding' className='mr-10'>
      <Button variant="outline" className = 'bg-amber-900 text-amber-100 mt-1 px-12 py-9' >Post Jobs</Button>
      </Link> */}
      </div>
   </div>

   
<div className='p-8'>
  <img src={landingPageImg} className='h-[700px] w-full' alt="" />
</div>

<div className='flex justify-center items-center flex-wrap gap-8 '>
<Card className='bg-white shadow-md rounded-lg border border-slate-200 m-8 mb-2 w-full md:w-[500px] sm:h-32'>
  <CardHeader >
    <CardTitle className='font-bold'>Plan Your Career Like Never Before</CardTitle>
    <CardDescription>Let our AI guide you to success. 
      From skill-building to job recommendations, 
      JobVerse creates a career path just for you.
    </CardDescription>
  </CardHeader>
</Card>
<Card className='bg-white shadow-md rounded-lg border border-slate-200 m-8 mb-2 w-full md:w-[500px] sm:h-32'>
  <CardHeader >
    <CardTitle className='font-bold'> Join the Community</CardTitle>
    <CardDescription>Be part of a thriving community of
       professionals. Learn, network, and excel in your journey
       to success with resources and support from JobVerse
    </CardDescription>
  </CardHeader>
</Card>
</div>

<div className='w-full p-8 mb-12'>
        <Accordion type='single' collapsible className='w-full'>
          {faqData.map((faq) => (
            <AccordionItem className='bg-white rounded-lg border border-slate-200 px-6
                   shadow-sm hover:shadow-md mb-1'
             key={faq.id} value={faq.id}>
              <AccordionTrigger className='font-semibold text-slate-800 hover:text-blue-600 py-4'>{faq.question}</AccordionTrigger>
              <AccordionContent className='text-slate-600 pb-4'>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
 
   </>
  )
}
