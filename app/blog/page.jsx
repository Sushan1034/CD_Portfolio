import { supabase } from '../../lib/supabase';
import BlogPageContent from '../../components/BlogPageContent';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Blogs & Technical Writing | Sushan Aryal",
  description: "Read technical articles and study guides about AWS Cloud, DevOps automation, CI/CD, Kubernetes, and serverless engineering by Sushan Aryal.",
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  let initialBlogs = [];
  try {
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });
    initialBlogs = data || [];
  } catch (err) {
    console.error('Error loading blogs from database:', err);
  }

  return <BlogPageContent initialBlogs={initialBlogs} />;
}
