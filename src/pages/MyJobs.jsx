import { useSession, useUser } from '@clerk/clerk-react'
import { Briefcase, School } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getMyApplications } from '../apis/Jobs'
import { BarLoader } from 'react-spinners';

export const MyJobs = () => {

  const{session} = useSession();
  const{user} = useUser();
  const[loading,setLoading]=useState(true);
  const[applications,setApplications]=useState([])

  const fetchMyApplications = async ()=>{
    try{
      const supabaseAccessToken = await session.getToken({template:"supabase"});
      const data = await getMyApplications(supabaseAccessToken,user.id);
      setApplications(data);
      console.log(data);
      // setLoading(false); This wont run if an error occurs in previous lines
    }
    catch(error){
      console.log("Error Fetching Applications",error);
    }
    finally{
      setLoading(false); // So this is teh correct placement of setLoading func

    }
  }

  useEffect( ()=>{
    if(session){
      fetchMyApplications();
    }

  },[session]);



  return (
   loading ? <div className='flex justify-center items-center h-screen'><BarLoader color='#d97706' /></div>:
   <div className='p-8 flex flex-col gap-8'>
<h1 className='mb-5 text-center text-3xl sm:text-4xl md:text-5xl font-bold '>My Applications</h1>
   {applications.map((application)=>(
    <div key={application.id} className='p-3 flex flex-col gap-4 border-amber-600 border rounded-md shadow-md'>
    <h2 className='text-2xl font-bold'>{application.jobs.title} at {application.jobs.companies.name}</h2>
    <div className='sm:flex justify-between items-center'>
      <div className='mb-2 flex gap-2 items-center'>
        <Briefcase/>
        <p>{application.experience} of experience`</p>
      </div>
      <div className='flex gap-2 items-center'>
        <School/>
        <p>{application.education}</p>
      </div>
    </div>
    <hr />
    <div className=' sm:flex justify-between items-center'>
      <p className='mb-1'>{application.created_at}</p>
      <p className='font-medium'>Status: <span className='font-bold'>{application.status}</span></p>
    </div>
  </div>
   ))}
</div> 
   
  )
}


