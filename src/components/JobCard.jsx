import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Heart, MapPinIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSession, useUser } from '@clerk/clerk-react';
import { uploadSaveJob } from '../apis/Jobs';

const JobCard = ({ job }) => {
  if (!job) return null;

  const navigate = useNavigate();
  const { user } = useUser();
  const { session } = useSession();
  const [fill, setFill] = useState(false);

  
  const handleMoreDetails = useCallback(() => {
    navigate(`/job/${job.id}`);
  }, [navigate, job.id]);

  
  const handleSaveJob = useCallback(async () => {
    setFill((prev) => !prev);

    if (!session) {
      console.log("session unavailable yet");
      return;
    }

    const supabaseAccessToken = await session.getToken({ template: "supabase" });
    const userId = user.id;
    const jobId = job.id;
    const res = await uploadSaveJob(supabaseAccessToken, userId, jobId);
    console.log(res);
  }, [session, user.id, job.id]);

  return (
    <div className='flex flex-col gap-6 sm:gap-4 md:gap-3 justify-between p-4 bg-white shadow-md rounded-lg border border-slate-200'>
      <h2 className='font-medium'>{job.title}</h2>
      <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center mb-2'>
        <img src={job?.company?.logo_url} alt="companyLogo" loading="lazy" className='h-6 mb-3' />
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
          className='flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border border-blue-500 rounded-md'
          onClick={handleMoreDetails}>
          More Details
        </Button>
        <Button onClick={handleSaveJob}>
          <Heart stroke='red' size={12} fill={fill ? "red" : "none"} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(JobCard);



