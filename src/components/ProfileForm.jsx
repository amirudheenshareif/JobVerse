import React, { useState } from 'react'
import {Label} from './ui/label'
import { Input } from './ui/input'
import {Button} from './ui/button'
import { cn } from "../lib/utils"; 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useSession, useUser } from '@clerk/clerk-react';
import { uploadApplicaion } from '../apis/Jobs';

export const ProfileForm = ({ className,job }) => {
 

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[education,setEducation]=useState("");
  const[exp,setExp]=useState("");
  const{session} = useSession();
  const{user} = useUser();




  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!session){
      console.log("session unavailable")
    }
    const supabaseAccessToken = await session.getToken({template:"supabase"});
    const res = await uploadApplicaion(supabaseAccessToken,user.id,name,email,education,exp,job.id);
    console.log(res); 
   
  };

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="Name">First Name</Label>
        <Input type="text" id="Name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="text" id="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        {/* <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" placeholder="Last Name" /> */}
        <Select onValueChange={setEducation}> 
      <SelectTrigger className='w-full '>
        <SelectValue placeholder="Education" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='bg-amber-200'>
          <SelectItem value="UG">UG</SelectItem>
          <SelectItem value="PG">PG</SelectItem>
          <SelectItem value="PhD">PhD</SelectItem>   
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      
 <div className="grid gap-2">
     <Label htmlFor="experience-level">Experience Level</Label>
     <Select onValueChange={setExp}> 
      <SelectTrigger className='w-full '>
        <SelectValue placeholder="Years of Experience" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='bg-amber-200'>
          <SelectItem value="0-1">0-1 years</SelectItem>
          <SelectItem value="1-3">1-3 years</SelectItem>
          <SelectItem value="3-5">3-5years</SelectItem>
          <SelectItem value="5+">5+</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
     </div>
     <div className="grid gap-2">
        <Label htmlFor="resume">Upload Resume</Label>
        <Input type="file" id="resume" placeholder="Email" name="resume" accept=".pdf,.doc,.docx" />
      </div>
      <Button type="submit" className='bg-amber-500'>Apply</Button>
    </form>
  );
}
