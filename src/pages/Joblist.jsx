import React, { useEffect,useState } from 'react'
import { getCompanies, getFilteredJobs, getJobs } from '../apis/Jobs'
import { useSession } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { JobCard } from '../components/JobCard'
import capitals from '../apis/location.json';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"



export const Joblist = () => {

  const {session}=useSession();
  const[loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const[companies,setCompanies]=useState([]);
  const[searchQuery,setSearchQuery]=useState("");
  const[location,setLocation]=useState(""); 
  const[selectedCompany,setSelectedCompany]=useState("");
  

  const fetchJobs = async () => {
      if(session){
        const supabaseAccessToken = await session.getToken({
          template:"supabase",
        });
        const data= await getJobs(supabaseAccessToken)
        console.log(data);
        setJobs(data || []); // to ensure job is never null
        setLoading(false);
      }
  }

  useEffect(() => {
    fetchJobs(); 
   }, [session])

  const fetchCompanies = async()=>{
    if(session){ 
      const supabaseAccessToken = await session.getToken({template:"supabase"});
      const resp = await getCompanies(supabaseAccessToken);
      console.log('resp',resp);
      setCompanies(resp || []); // to ensure companies is never null
    }
  } 

  useEffect(()=>{
    fetchCompanies();
  },[session])


  const handleSearch = async()=>{
      setLoading(true)
      if(session){
      console.log(selectedCompany,typeof(selectedCompany))
      const supabaseAccessToken = await session.getToken({template:"supabase"});
      const resp = await getFilteredJobs(supabaseAccessToken,{searchQuery,location,selectedCompany})
      setJobs(resp || []);
      console.log("Jobs after filter");
      console.log(jobs);
      setLoading(false);
    }

    // useEffect(() => {
    //   console.log("Jobs state updated:", jobs);
    // }, [jobs]); /For debugging
    
  }

  return (
    loading ? <div className='flex justify-center items-center h-screen'><BarLoader color='#d97706' /></div> :
    <div className='flex-col' >
      <h1 className='text-4xl sm:text-5xl font-bold text-center mb-6'>JobDirectory</h1>
      <div className='flex gap-2 px-8 mb-4'> 
      <Input placeholder="Search Jobs by title" value={searchQuery} onChange ={(e)=> setSearchQuery(e.target.value)} />
      <Button className='bg-amber-700' onClick={handleSearch} >Search </Button>
      </div>

      
    <section className='flex gap-3 flex-wrap sm:justify-between px-8 '>

    <Select onValueChange={setLocation} defaultValue={location}> 
      <SelectTrigger  className='w-[45%] sm:w-[40%] '>
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='bg-amber-100'>
        {capitals.map((capitalObj) => (
              <SelectItem key={capitalObj.capital} value={capitalObj.capital}>
                {capitalObj.capital}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select onValueChange={setSelectedCompany} defaultValue={selectedCompany} >
      <SelectTrigger  className='w-[45%] sm:w-[40%] '>
        <SelectValue placeholder="Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='bg-amber-100'>
       {companies.map((company)=>(
         <SelectItem value={company.id} key={company.id}>{company.name}</SelectItem>
       ))}  
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button className='px-4 '>Clear filters</Button>
    </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 py-10">
      {jobs?.length>0 ? jobs.map((job) => ( //check is to ensure jobs is never null since mapping null causes error
         <JobCard  key={job.id} job={job}  />
      )) : <p>No jobs found </p>}
      </div>
    
</div>
  )
}
