-- 1. Create instagram_videos table
CREATE TABLE IF NOT EXISTS public.instagram_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    video_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for instagram_videos
ALTER TABLE public.instagram_videos ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
DROP POLICY IF EXISTS "Allow public read access" ON public.instagram_videos;
CREATE POLICY "Allow public read access" ON public.instagram_videos
    FOR SELECT USING (true);

-- Allow authenticated write access (Admin Only)
DROP POLICY IF EXISTS "Allow admin write access" ON public.instagram_videos;
CREATE POLICY "Allow admin write access" ON public.instagram_videos
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 2. Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT,
    content TEXT,
    excerpt TEXT,
    read_time TEXT,
    link TEXT,
    date DATE,
    tags TEXT[],
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
DROP POLICY IF EXISTS "Allow public read access" ON public.blogs;
CREATE POLICY "Allow public read access" ON public.blogs
    FOR SELECT USING (true);

-- Allow authenticated write access (Admin Only)
DROP POLICY IF EXISTS "Allow admin write access" ON public.blogs;
CREATE POLICY "Allow admin write access" ON public.blogs
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 3. Create certifications table
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    link TEXT,
    icon_url TEXT,
    color TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for certifications
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
DROP POLICY IF EXISTS "Allow public read access" ON public.certifications;
CREATE POLICY "Allow public read access" ON public.certifications
    FOR SELECT USING (true);

-- Allow authenticated write access (Admin Only)
DROP POLICY IF EXISTS "Allow admin write access" ON public.certifications;
CREATE POLICY "Allow admin write access" ON public.certifications
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 4. Create training_programs table
CREATE TABLE IF NOT EXISTS public.training_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    code TEXT NOT NULL,
    level TEXT NOT NULL,
    description TEXT,
    features TEXT[],
    badge_icon TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for training_programs
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
DROP POLICY IF EXISTS "Allow public read access" ON public.training_programs;
CREATE POLICY "Allow public read access" ON public.training_programs
    FOR SELECT USING (true);

-- Allow authenticated write access (Admin Only)
DROP POLICY IF EXISTS "Allow admin write access" ON public.training_programs;
CREATE POLICY "Allow admin write access" ON public.training_programs
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 5. Create Storage Policies for 'videos' and 'images' buckets
-- Note: Create the 'videos' and 'images' buckets as public in your Supabase dashboard first.

DROP POLICY IF EXISTS "Allow public read access to storage objects" ON storage.objects;
CREATE POLICY "Allow public read access to storage objects"
ON storage.objects FOR SELECT
USING (bucket_id IN ('videos', 'images'));

DROP POLICY IF EXISTS "Allow authenticated users to insert storage objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow anyone to insert storage objects" ON storage.objects;
CREATE POLICY "Allow anyone to insert storage objects"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id IN ('videos', 'images'));

DROP POLICY IF EXISTS "Allow authenticated users to update storage objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow anyone to update storage objects" ON storage.objects;
CREATE POLICY "Allow anyone to update storage objects"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id IN ('videos', 'images'))
WITH CHECK (bucket_id IN ('videos', 'images'));

DROP POLICY IF EXISTS "Allow authenticated users to delete storage objects" ON storage.objects;
DROP POLICY IF EXISTS "Allow anyone to delete storage objects" ON storage.objects;
CREATE POLICY "Allow anyone to delete storage objects"
ON storage.objects FOR DELETE
TO public
USING (bucket_id IN ('videos', 'images'));


-- 6. Seed Data (Optional - run these to populate the database with default data)

-- Seed Certifications
INSERT INTO public.certifications (title, issuer, link, icon_url, color, display_order)
VALUES 
('AWS Solutions Architect Associate', 'Amazon Web Services', 'https://www.credly.com/badges/8cf802c9-2b2e-4e88-84d7-f2c5c08abc21', '/SAA1-C03.png', 'from-orange-400 to-orange-600', 1),
('AWS Developer Associate', 'Amazon Web Services', 'https://www.credly.com/badges/1d338ac4-ad57-4a30-9d10-43feefe4f414/', '/DA.png', 'from-purple-400 to-purple-600', 2),
('AWS Cloud Practitioner', 'Amazon Web Services', 'https://www.credly.com/badges/4f2a8365-92c3-4e10-8ac4-497de332703f', '/CLP1.png', 'from-blue-400 to-blue-600', 3),
('Oracle Certified Architect Associate', 'Oracle', 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=91504DD65238D09DBA697AA9D265BEC3E69B56EBC4C592B35E1D611470C99036', '/OAA1.png', 'from-red-400 to-red-600', 4),
('OCI Foundations Associate', 'Oracle', 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=4A3497FCDDBEAF6437EDBCF6AAD1B20A2DE06BE986270C091CC15FEB738450C0', '/OFA1.png', 'from-slate-400 to-slate-600', 5)
ON CONFLICT DO NOTHING;


-- Seed Training Programs
INSERT INTO public.training_programs (title, code, level, description, features, badge_icon, display_order)
VALUES 
(
  'AWS Cloud Practitioner', 
  'CLF-C02', 
  'FOUNDATIONAL LEVEL', 
  'Beginner-friendly mentorship designed for individuals with non-technical or basic technical backgrounds. Learn AWS core concepts, pricing structures, shared security models, and foundational services.', 
  ARRAY['Core AWS concepts', 'Security & pricing basics', 'Curated study resources'], 
  '/CLP1.png', 
  1
),
(
  'AWS Solutions Architect', 
  'SAA-C03', 
  'ASSOCIATE LEVEL', 
  'Designed for learners aspiring to design robust, cost-effective, secure, and highly available multi-tier architectures. Delve into networking, Auto Scaling, Elastic Load Balancing, RDS, and S3 structures.', 
  ARRAY['Design resilient architectures', 'VPC, Auto Scaling, ELB', 'Hands-on labs & scenarios'], 
  '/SAA1-C03.png', 
  2
),
(
  'AWS Developer Associate', 
  'DVA-C02', 
  'ASSOCIATE LEVEL', 
  'For programmers, developers, and DevOps engineers looking to master serverless application designs, deployment tools, application lifecycles, monitoring, debugging, and secure authentication models.', 
  ARRAY['Serverless & application design', 'AWS services & security', 'CI/CD with AWS tools'], 
  '/DA.png', 
  3
)
ON CONFLICT DO NOTHING;


-- Seed Blogs
INSERT INTO public.blogs (title, excerpt, read_time, link, date, tags, image_url)
VALUES 
(
  'AWS Shared Responsibility Model Demystified', 
  'Understanding who is responsible for what in the cloud is crucial. Here is an easy-to-follow guide with real-world examples.', 
  '5 min read', 
  'https://medium.com/@sushanaryal/aws-shared-responsibility-model-demystified', 
  '2026-02-10', 
  '["Security", "AWS Basics"]'::jsonb, 
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80'
),
(
  'AWS Billing & Cost Management: A Survival Guide', 
  'How to set up budgets, billing alarms, and understand the difference between Cost Explorer and Budgets to avoid unexpected bills.', 
  '7 min read', 
  'https://medium.com/@sushanaryal/aws-billing-cost-management-survival-guide', 
  '2026-02-18', 
  '["Billing", "FinOps"]'::jsonb, 
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
),
(
  'Designing Highly Available & Resilient Multi-Tier Architectures', 
  'A blueprint for setting up Auto Scaling Groups across multiple Availability Zones with ALBs and Multi-AZ RDS deployments.', 
  '12 min read', 
  'https://medium.com/@sushanaryal/designing-highly-available-resilient-multi-tier-architectures', 
  '2026-03-05', 
  '["Architecture", "Resilience"]'::jsonb, 
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
),
(
  'Decoupling Microservices: AWS SQS vs. SNS vs. EventBridge', 
  'An architectural comparison of message queues, pub/sub topics, and event buses. When to use which for asynchronous workflows.', 
  '9 min read', 
  'https://medium.com/@sushanaryal/decoupling-microservices-sqs-sns-eventbridge', 
  '2026-03-22', 
  '["Integration", "Microservices"]'::jsonb, 
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
),
(
  'Mastering DynamoDB: Single-Table Design Patterns', 
  'How to model one-to-many and many-to-many relationships in a single DynamoDB table using partition keys, sort keys, and GSIs.', 
  '15 min read', 
  'https://medium.com/@sushanaryal/mastering-dynamodb-single-table-design', 
  '2026-04-12', 
  '["Database", "NoSQL"]'::jsonb, 
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80'
),
(
  'Building Serverless CI/CD Pipelines with AWS CodePipeline', 
  'A step-by-step guide to automating serverless deployments using AWS CodeBuild, CodeDeploy, and GitHub integration.', 
  '10 min read', 
  'https://medium.com/@sushanaryal/building-serverless-cicd-pipelines-aws-codepipeline', 
  '2026-04-29', 
  '["CI/CD", "Serverless"]'::jsonb, 
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80'
)
ON CONFLICT DO NOTHING;


-- 7. Create counseling_requests table
CREATE TABLE IF NOT EXISTS public.counseling_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    certification TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for counseling_requests
ALTER TABLE public.counseling_requests ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (anyone can submit a message)
DROP POLICY IF EXISTS "Allow public insert access" ON public.counseling_requests;
CREATE POLICY "Allow public insert access" ON public.counseling_requests
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view/delete messages (Admin Only)
DROP POLICY IF EXISTS "Allow admin read write access" ON public.counseling_requests;
CREATE POLICY "Allow admin read write access" ON public.counseling_requests
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


