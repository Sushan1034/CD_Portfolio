import { supabase } from '../lib/supabase';
import MainPortfolioLayout from '../components/MainPortfolioLayout';

export const revalidate = 60; // ISR - revalidate every 60 seconds

async function getPortfolioData() {
  try {
    const [
      { data: certs, error: certsError },
      { data: videos, error: videosError },
      { data: blogs, error: blogsError },
      { data: training, error: trainingError }
    ] = await Promise.all([
      supabase.from('certifications').select('*').order('display_order', { ascending: true }),
      supabase.from('instagram_videos').select('*').order('display_order', { ascending: true }),
      supabase.from('blogs').select('*').order('date', { ascending: false }),
      supabase.from('training_programs').select('*').order('display_order', { ascending: true })
    ]);

    if (certsError) console.error('Error fetching certs:', certsError);
    if (videosError) console.error('Error fetching videos:', videosError);
    if (blogsError) console.error('Error fetching blogs:', blogsError);
    if (trainingError) console.error('Error fetching training:', trainingError);

    return {
      certifications: certs || [],
      instagramVideos: videos || [],
      blogs: blogs || [],
      trainingPrograms: training || []
    };
  } catch (error) {
    console.error('Failed to query Supabase database:', error);
    return {
      certifications: [],
      instagramVideos: [],
      blogs: [],
      trainingPrograms: []
    };
  }
}

export default async function Page() {
  const data = await getPortfolioData();
  return <MainPortfolioLayout data={data} />;
}
