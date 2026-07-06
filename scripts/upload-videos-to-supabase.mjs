import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Polyfill for WebSocket in Node.js < 22 environments for Supabase Realtime client init
if (typeof global.WebSocket === 'undefined') {
  global.WebSocket = class {};
}

import { createClient } from '@supabase/supabase-js';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const localVideoDir = path.resolve(process.cwd(), 'public', 'videos');
const videoFiles = [
  'Day-1_EC2.mp4',
  'Day-2.mp4',
  'Day-3.mp4',
  'Day-4.mp4',
  'Day-5.mp4'
];

async function runUpload() {
  console.log('Starting video upload to Supabase Storage...');

  // Ensure storage bucket exists
  const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('videos');
  if (bucketError && bucketError.message.includes('not found')) {
    console.log('Creating "videos" storage bucket...');
    const { error } = await supabase.storage.createBucket('videos', {
      public: true,
      allowedMimeTypes: ['video/mp4'],
      fileSizeLimit: 250000000 // 250MB
    });
    if (error) {
      console.error('Error creating bucket:', error);
      process.exit(1);
    }
  }

  for (const filename of videoFiles) {
    const localFilePath = path.join(localVideoDir, filename);

    if (!fs.existsSync(localFilePath)) {
      console.warn(`File not found: ${localFilePath}, skipping.`);
      continue;
    }

    console.log(`Uploading ${filename} to Supabase Storage...`);
    const fileBuffer = fs.readFileSync(localFilePath);
    const storagePath = `instagram/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(storagePath, fileBuffer, {
        contentType: 'video/mp4',
        upsert: true
      });

    if (uploadError) {
      console.error(`Failed to upload ${filename}:`, uploadError.message);
      continue;
    }

    const { data } = supabase.storage.from('videos').getPublicUrl(storagePath);
    console.log(`Successfully uploaded ${filename}!`);
    console.log(`Public URL: ${data.publicUrl}`);
    console.log('---');
  }

  console.log('Video migration completed.');
}

runUpload();
