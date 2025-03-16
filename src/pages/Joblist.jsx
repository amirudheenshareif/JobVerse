import React, { useEffect, useState, Suspense, useCallback, useMemo } from 'react';
import { getFilteredJobs,getCompanies, getJobs } from '../apis/Jobs';
import { RotateLoader } from 'react-spinners';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import capitals from '../apis/location.json';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSession } from '@clerk/clerk-react';
const JobCard = React.lazy(() => import('../components/JobCard'));


export const Joblist = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const fetchData = useCallback(async () => {
    if (session) {
      const supabaseAccessToken = await session.getToken({ template: "supabase", refresh: "true" });
  
      const [jobsData, companiesData] = await Promise.all([
        getJobs(supabaseAccessToken),
        getCompanies(supabaseAccessToken)
      ]);
  
      setJobs(jobsData || []);
      setCompanies(companiesData || []);
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    if (session) {
      const supabaseAccessToken = await session.getToken({ template: "supabase", refresh: "true" });
      const resp = await getFilteredJobs(supabaseAccessToken, { searchQuery, location, selectedCompany });
      setJobs(resp || []);
      setLoading(false);
    }
  }, [session, searchQuery, location, selectedCompany]);

  const handleClearFilters = useCallback(async () => {
    setLoading(true);
    setLocation("");
    setSelectedCompany("");
    setSearchQuery("");
    if (session) {
      await fetchData();
    }
    setLoading(false);
  }, [session, fetchData]);

  const memoizedJobs = useMemo(() => jobs, [jobs]);

  return (
    loading ? <div className='flex justify-center items-center h-screen'><RotateLoader color='#2563EB' /></div> :
    <div className='flex flex-col gap-2 ' >
      <h1 className='text-4xl sm:text-5xl font-bold text-center mb-6'>Job Directory</h1>
      <div className='flex gap-1 sm:gap-2 px-8 mb-4'> 
      <Input className='px-3 py-0  sm:px-4 sm:py-2 bg-white border border-slate-200 rounded-md focus:border-blue-500'
       placeholder="Search Jobs by title" value={searchQuery} onChange ={(e)=> setSearchQuery(e.target.value)} />
      <Button className='bg-blue-600 text-white rounded-md hover:bg-blue-700 px-3 py-0  sm:px-4 sm:py-2' onClick={handleSearch} >Search </Button>
      </div>

      
    <section className='flex gap-6 flex-wrap sm:justify-between px-8 '>

    <Select value={location} onValueChange={setLocation} > 
      <SelectTrigger  className='w-[45%] sm:w-[40%] bg-white border border-slate-200 rounded-md px-4 py-2 '>
        <SelectValue placeholder={location=="" ? "Location": location} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='bg-slate-100'>
        {capitals.map((capitalObj) => (
              <SelectItem key={capitalObj.capital} value={capitalObj.capital}>
                {capitalObj.capital}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select value={selectedCompany} onValueChange={setSelectedCompany}  >
      <SelectTrigger  className='w-[45%] sm:w-[40%] bg-white border border-slate-200 rounded-md px-4 py-2 '>
        <SelectValue placeholder={selectedCompany=="" ? "Company": selectedCompany} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='bg-slate-100'>
       {companies.map((company)=>( 
         <SelectItem  value={company.id} key={company.id}>{company.name}</SelectItem>
       ))}  
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button
     className='w-full sm:w-[15%] border border-slate-200 text-slate-600
                rounded-md px-4 py-2 hover:bg-slate-50 hover:text-slate-800 'onClick={handleClearFilters} >Clear filters</Button>
    </section>
      
    <Suspense fallback={<div className='flex justify-center items-center h-screen'><RotateLoader color='#2563EB' /></div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 py-10">
          {memoizedJobs?.length > 0 ? memoizedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          )) : <p className='font-semibold'>Looks like a small hiccup—refresh to continue!</p>}
        </div>
      </Suspense>
    
</div>
  )
}

