import React, { useEffect,useState} from 'react'
import { useParams, } from 'react-router-dom'
import { getJobs } from '../apis/Jobs';
import { useSession } from '@clerk/clerk-react';
import { DoorOpen, MapPinIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BarLoader } from 'react-spinners';
import { ProfileForm } from '../components/ProfileForm';


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "../components/ui/drawer";


export const Job = () => {
    
  const {id} = useParams();
  const [job, setJob] = useState([]);
  const{session} = useSession();
  const [loading, setLoading] = useState(true);

  // const jobRequirementArray = job.requirements.split("\n");
  

  const fetchSingleJob = async ()=>{
   if (!session) {
    return;
   }
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const data =  await getJobs(supabaseAccessToken, id);
    if(!data){
      console.log("No data found");
    }
    console.log(data);
    setJob(data);
    setLoading(false);
    
  }

  useEffect(() => {
    fetchSingleJob(); 
  }, [id,session]); // every time pages refreshes we get new session so we need to add session in the dependency array

  return (
    loading ? <div className='flex justify-center items-center h-screen'><BarLoader color='#d97706' /></div> :
    <div className='px-8 flex flex-col justify-between gap-5'>
      <div className='text-left sm:flex sm:justify-between items-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 '>{job?.title}</h1>
        {job?.company && <img src={job?.company?.logo_url} alt={job?.company?.name} className='h-6' />}
      </div>

      <div className='flex justify-between items-center sm:justify-start gap-4 mt-5'>
        <div className='flex items-center'>
          <MapPinIcon size="16" />
          <span className='text-1xl font-medium ml-1'>{job?.location}</span>
        </div>

        <div className='flex items-center'>
          <DoorOpen size="16" />
          <span className='text-1xl font-medium ml-1'>Open</span>
        </div>
      </div>

      <div className='mt-5'>
        <h2 className='text-2xl font-bold'>About the Job</h2>
        <p className='mt-3 font-medium'>{job?.description}</p>
      </div>
      <div className='mt-5 flex flex-col'>
        <h2 className='text-2xl font-bold'>What you bring to the team</h2>
        <ul className='mt-3 list-disc list-inside'>
          {job?.requirements && job?.requirements.split("\n").map((requirement, index) => (
            <li key={index} className='mt-2 font-medium'>{requirement}</li>
          ))}
        </ul>
      </div>
      
      <Dialog >
        <DialogTrigger asChild>
        <Button className='my-5 bg-amber-600 text-amber-100'>Apply</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-amber-300">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm  job={job} />
        </DialogContent>
      </Dialog>


      
    </div>   
  )
}

// export function DrawerDialogDemo() {
//   const [open, setOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width: 768px)");

  // if (isDesktop) {
  //   return (
      
  //   );
  // }

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>
//         <Button variant="outline">Edit Profile</Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader className="text-left">
//           <DrawerTitle>Edit profile</DrawerTitle>
//           <DrawerDescription>
//             Make changes to your profile here. Click save when you're done.
//           </DrawerDescription>
//         </DrawerHeader>
//         <ProfileForm className="px-4" />
//         <DrawerFooter className="pt-2">
//           <DrawerClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// }



