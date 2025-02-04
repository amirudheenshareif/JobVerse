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

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '../components/ui/carousel'


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
   <div className='mt-20 flex flex-col items-center justify-center  bg-amber-200'>
      <h1 className='text-7xl text-center  font-bold  '>Discover Your Next Career Move with JobVerse.</h1>
      <h2 className='text-4xl text-center mt-10 font-medium'>Find. Post. Connect. – Your Job Search, Simplified</h2>
      <div className='mt-10  flex justify-center gap-8' >
      <Link to='/joblist'>
      <Button variant="outline" className = 'bg-amber-900 text-amber-100 mt-1 px-12 py-9' >Find Jobs</Button>
      </Link>
      <Link to='/onboarding'>
      <Button variant="outline" className = 'bg-amber-900 text-amber-100 mt-1 px-12 py-9' >Post Jobs</Button>
      </Link>
      </div>
   </div>

   {/* <Carousel>
  <CarouselContent>
    <CarouselItem>Hi</CarouselItem>
    <CarouselItem>Bye</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel> */}
<div className='p-8'>
  <img src={landingPageImg} className='h-[700px] w-full' alt="" />
</div>

<div className='flex justify-center items-center flex-wrap gap-8 '>
<Card className='m-8 mb-2 w-full md:w-[500px] h-32'>
  <CardHeader >
    <CardTitle className='font-bold'>Plan Your Career Like Never Before</CardTitle>
    <CardDescription>Let our AI guide you to success. 
      From skill-building to job recommendations, 
      JobVerse creates a career path just for you.
    </CardDescription>
  </CardHeader>
</Card>
<Card className='m-8 mb-2 w-full md:w-[500px] h-32'>
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
<Accordion type="single" className='w-full ' collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>How does JobVerse help me find jobs?</AccordionTrigger>
    <AccordionContent>
    JobVerse matches you with tailored opportunities
     using advanced filters and AI insights,
      ensuring you find jobs aligned with your goals.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="single"  collapsible>
  <AccordionItem value="item-2">
    <AccordionTrigger>What makes JobVerse unique?</AccordionTrigger>
    <AccordionContent>
    We offer features like AI Career Path Planner, 
    personalized growth suggestions, and a supportive
    community for holistic career development.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="single" collapsible>
  <AccordionItem value="item-3">
    <AccordionTrigger> Can I upskill with JobVerse?</AccordionTrigger>
    <AccordionContent>
    Yes, JobVerse provides tailored learning suggestions and 
    resources to help you stay ahead in your career.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion type="single" collapsible>
  <AccordionItem value="item-4">
    <AccordionTrigger>Is JobVerse free?</AccordionTrigger>
    <AccordionContent>
    Yes, JobVerse is free for job seekers,
   with premium features available via subscription.
    </AccordionContent>
  </AccordionItem>
</Accordion>

</div>








   
   </>
  )
}
