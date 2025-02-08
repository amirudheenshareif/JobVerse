import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession, useUser } from '@clerk/clerk-react'
import { getSavedJobs,deleteSavedJobs } from '../apis/Jobs'
import {  MapPinIcon, Trash2Icon } from 'lucide-react'
import {Button} from '../components/ui/button'
import { BarLoader } from 'react-spinners'




export const SavedJobs = () => {
  const{session} = useSession();
  const[savedJobs, setSavedJobs] = useState([]);
  const{user}=useUser();
  const navigate = useNavigate();
  const [loading , setLoading]=useState(true);

 

  async function fetchSavedJobs() {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const data = await getSavedJobs(supabaseAccessToken,user.id);
    setSavedJobs(data || []);
    console.log(data);
    setLoading(false)
  }

  async function handleDeleteJob(jobId){
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const res = await deleteSavedJobs(supabaseAccessToken,user.id,jobId);
    
    const data = await getSavedJobs(supabaseAccessToken,user.id);
    setSavedJobs(data);
    console.log(data);

  }

  useEffect(() => {
    if(session){
      fetchSavedJobs();
    }
  }, [session]);



  return (

     loading ? <div className='flex justify-center items-center h-screen'><BarLoader color='#d97706' /></div> :
      
     <div>
      <h1 className='mb-5 text-center text-3xl sm:text-4xl md:text-5xl font-bold '>Saved Jobs</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 py-10">
      {savedJobs?.map((savedJob)=>(
      <div key={savedJob.job_id} className='flex flex-col gap-6 sm:gap-4 md:gap-3 justify-between p-4  bg-white shadow-md rounded-lg border border-slate-200 '>
   <h2 className='font-medium'>{savedJob.jobs.title}</h2>
   <div className='flex justify-between items-center mb-2'>
         <img src={savedJob.jobs.companies.logo_url} alt="companyLogo" className='h-6' />
         <div className='flex justify-center items-center'>
            <MapPinIcon size="16" />
            <span className='ml-1 font-medium'>{savedJob.jobs.location}</span>
         </div>
</div>
   <div>
    {savedJob.jobs.description}
   </div>

   <div className='flex gap-3 justify-between items-center'>
   <Button variant="outline" 
           className='flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border border-blue-500 rounded-md '
           onClick={()=> navigate(`/job/${savedJob.job_id}`)}>
              More Details</Button>
      <Button
      onClick={() => handleDeleteJob(savedJob.job_id)}
      ><Trash2Icon color='red'  size={12}/></Button>
    
   </div>


</div> 
    ))}</div>
     </div>

  )
}



