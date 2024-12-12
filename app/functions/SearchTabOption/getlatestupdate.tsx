import { supabase } from "@/app/lib/supabase";

export interface LatestUpdate {
    luid: number;
    created_at: string;
    lutitle: string;
    luauthor: string;
    ludescription: string;
    luimageurl: string;
  }

  
  export const getLatestUpdates = async (): Promise<LatestUpdate[]> => {
    let { data: latestupdate, error } = await supabase
      .from('latestupdate')
      .select('*');
    if (error || !latestupdate) {
      console.error(error);
      return [];
    }
    return latestupdate;
  };