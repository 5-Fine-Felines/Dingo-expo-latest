import { supabase } from '@/app/lib/supabase';

export type LatestNews = {
    lnid: number;
    created_at: string;
    imgurla: string | null;
    imgurlb: string | null;
    imgurlc: string | null;
    ncontent: string;
    uname: string;
    nuid: number;
  };
 async function getlatestnews(): Promise<LatestNews[]> {
    let { data: latestnews, error } = await supabase
    .from('latestnews')
    .select('*');

  if (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }

  return latestnews || [];
}

export default getlatestnews;