import supabaseClient from "../utils/supabase";

// Fetch Jobs
export async function getJobs(token, id=null ) {
    if (!token) {
        console.error("Token is missing!");
        return null;
      }
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url)");

  if(id){
    query = query.eq("id", id).single();//single method is used to get a single record as an object
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

export async function getSavedJobs (token,userId){
    if(!token){
    console.error("Token is missing!");
    return null;
  }
  const supabase = await supabaseClient(token);
  const query = supabase
  .from("saved_jobs")
  .select(`
    user_id,
    job_id,
    jobs:job_id (
      *,
      companies:company_id (
        name,
        logo_url
      )
    )
  `)
  .eq("user_id", userId); 
    
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }
  return data;
}

export async function uploadSaveJob(token,userId,jobId){
  const supabase = await supabaseClient(token);

  //check if job is already present
  const {data , error} = await supabase.from("saved_jobs").select("id").eq("user_id",userId).eq("job_id",jobId);
  if(error){
    console.log("Error checking job",error);
    return;
  }

  if(data && data.length>0){ // This means that job is already present , so delete it
    const{error} = await supabase.from("saved_jobs").delete().eq("user_id",userId).eq("job_id",jobId).select();
    
    if(error){
      console.log("Error deleting job",error);
      return;
    }
    return {message:"Deleting Job Successfull"}
  }
  else{ // This block executes if job is not present, so insert it
    const{error}=await supabase.from("saved_jobs").insert([
      {
        "user_id":userId,
        "job_id":jobId,
      }
    ])
    if(error){
      console.log("Error inserting job",error);
      return;
    }
    return {message:"Inserting Job Successfull"}

  }
}

export async function deleteSavedJobs(token , userId,jobId){
  const supabase = await supabaseClient(token);
  const{error} = await supabase.from("saved_jobs").delete().eq("user_id",userId).eq("job_id",jobId).select();

  if(error){
    console.log("Error deleting job",error);
    return;
  }
  return {message:"Deleting Job Successfull"}

}

export async function uploadApplicaion(token,userId,name,email,education,exp,jobId){
  const supabase = await supabaseClient(token);


   const{data,error} = await supabase.from("applications")
  .select("candidate_id,job_id").eq("candidate_id",userId).eq("job_id",jobId);

  if(error){
    console.log(error);
  }

  if(data.length>0){
    console.log("Already Applied");
    return;
  }
  else{
    const{error}=await supabase.from("applications").insert([
      {
        "candidate_id":userId,
        "job_id":jobId,
        "name":name,
        "education":education,
        "experience":exp,
        "candidate_email": email,
      }
    ]);

    if(error){
      console.log("Error applying",error);
      return { message: "Error applying for job." };
    }
    return {message:"Application successful"};
  }
}

export async function getMyApplications(token,userId){

  const supabase = await supabaseClient(token);

  const{data,error} = await supabase.from("applications")
  .select(`*,
    jobs:job_id(*,
    companies:company_id(name))
  `).eq("candidate_id",userId);

  if(error){
    console.log(error);
    return {error};
  }

  if(data.length==0){
    return [];
  }

    console.log("Applications query Successful");
    return data;
  
}

export async function getCompanies(token){
  const supabase = await supabaseClient(token);
  const{data,error} = await supabase.from("companies").select("name,id");
  console.log("getCompanies called");
  if(error){
    console.log("Error fetching Companies",error);
    return [];
  }
  return data;
 

}

export async function getFilteredJobs(token,{searchQuery,location="",selectedCompany=""}){
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs")  // No await , because await executes the query immediately
  .select("*,company:companies(name,logo_url)");

      if (location) {
    query = query.eq("location", location);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  if(selectedCompany){
    console.log("Querying for companyId:", selectedCompany);
    query = query.eq("company_id", selectedCompany);

  }


  const{data,error} =await query;

  if(error){
    console.log("error querying",error)
    return;
  }

  return data;
}

export async function checkApplication(token,jobId,userId){
  const supabase = await supabaseClient(token);
  const{data,error} = await supabase.from("applications").select("candidate_id,job_id").eq("candidate_id", userId).eq("job_id",jobId);

  if(error){
    console.log("Error checking Applications")
    return;
  }
  if(data.length > 0){
    console.log("Already applied");
    return true;
  }
  return false;
}

    

















// const { data, error } = await supabase
//   .from('saved_jobs')  // Start from the saved_jobs table
//   .select(`
//     job_id,  // Select job_id from saved_jobs table
//     jobs:job_id (  // Fetch job details using the job_id in saved_jobs
//       job_name, 
//       job_description, 
//       requirements,  
//       companies:company_id ( // Fetch company details using the company_id in jobs
//         name,  // Select company name from companies table
//         logo_url  // Select company logo_url from companies table
//       )  
//     )  
//   `)
//   .eq('user_id', 101); 






