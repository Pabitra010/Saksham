"use server";

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'  

export async function getQuizData() {
  const supabase = createClient(cookies())
  const { data, error } = await supabase.from('quiz-data').select('*');

   console.log(data,"data");

  if (error) {
    console.error("Error fetching quiz data:", error);
    return {success: false, message: "failed to fetch quiz data"};
  }
 return {success: true, data};

}