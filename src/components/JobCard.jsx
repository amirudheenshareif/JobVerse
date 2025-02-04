import React, { useState } from 'react'
import { Button } from './ui/button'
import { Heart, MapPinIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSession, useUser } from '@clerk/clerk-react'
import { uploadSaveJob } from '../apis/Jobs'




export const JobCard = ({job}) => {

      const navigate = useNavigate();
      const {user}=useUser();
      const {session}=useSession();
      const [fill,setFill]=useState(false);

      const handleMoreDetails = () => {
         navigate(`/job/${job.id}`);
      }
      

     

      const  handleSaveJob = async () =>{
         setFill((prev)=>!prev);

         if(!session){
            console.log("session unavailable yet");
         }

         if(session){
            const supabaseAccessToken= await session.getToken({template:"supabase",});
            const userId = user.id;
            console.log(userId);
            const jobId = job.id;
            const res= await uploadSaveJob(supabaseAccessToken,userId,jobId);
            console.log(res);
         }
         
      }

  return (
    
<div className='flex flex-col gap-6 sm:gap-4 md:gap-3 justify-between  border-amber-600 border p-4 rounded-md shadow-md'>
   <h2 className='font-medium'>{job.title}</h2>
   <div className='flex justify-between items-center mb-2'>
         <img src={job?.company?.logo_url} alt="companyLogo" className='h-6' />
         <div className='flex justify-center items-center'>
            <MapPinIcon size="16" />
            <span className='ml-1 font-medium'>{job.location}</span>
         </div>
</div>
   <div>
    {job.description}
   </div>

   <div className='flex gap-3 justify-between items-center'>
   <Button variant="outline" 
           className='flex-1'
           onClick={handleMoreDetails}>
              More Details</Button>
      <Button onClick={handleSaveJob}>
      <Heart stroke='red' size={12}  fill={fill ? "red" : "none"}
      
      /></Button>
    
   </div>


</div> 

   )
}




//         <Card className=" flex flex-col justify-between "> 
//     <CardHeader>
//       <CardTitle>{job.title}</CardTitle>
//       </CardHeader>

//       <CardContent className='flex flex-col'>
//       <div className='flex justify-between items-center mb-2'>
//          <img src={job.company.logo_url} alt="companyLogo" className='h-6' />
//          <div className='flex justify-center items-center'>
//             <MapPinIcon size="16" />
//             <span className='ml-1 font-medium'>{job.location}</span>
//          </div>
//       </div>
//         <CardDescription >{job.description}</CardDescription>
//     </CardContent >
//     <CardFooter className="flex- gap-2.5 justify-between">
//       <Button variant="outline"
//               className='flex-1'
//               onClick={() => {navigate(`/job/${job.id}`)}}>
//               More Details</Button>
//       <Button>H</Button>
//     </CardFooter>
//   </Card>
 
    
 
