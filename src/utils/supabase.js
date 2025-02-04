
import { createClient } from "@supabase/supabase-js";

//  Access token (from the session created by clerk
//  and pass that token to supabaseClient function 
//  that create a client to communicate 
//  with supabase with the help of createClient library

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

const supabaseClient = async (supabaseAccessToken) => {
  if(!supabase){
      supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    });
  }
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};

export default supabaseClient;
        