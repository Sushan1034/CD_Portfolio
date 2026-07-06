import { supabase } from '../../lib/supabase';
import TrainingPageContent from '../../components/TrainingPageContent';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "AWS Mentorship & Counseling | Sushan Aryal",
  description: "Accelerate your AWS Cloud Practitioner, Solutions Architect SAA-C03, and Developer Associate DVA-C02 preparation with 1-on-1 counseling from Sushan Aryal.",
  alternates: {
    canonical: '/training',
  },
};

export default async function TrainingPage() {
  let initialVideos = [];
  let initialPrograms = [];
  try {
    const [
      { data: videos },
      { data: programs }
    ] = await Promise.all([
      supabase.from('instagram_videos').select('*').order('display_order', { ascending: true }),
      supabase.from('training_programs').select('*').order('display_order', { ascending: true })
    ]);
    initialVideos = videos || [];
    initialPrograms = programs || [];
  } catch (err) {
    console.error('Error fetching training data from Supabase:', err);
  }

  return <TrainingPageContent initialVideos={initialVideos} initialPrograms={initialPrograms} />;
}
