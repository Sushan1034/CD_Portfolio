import { createClient } from '@supabase/supabase-api-js';
import dotenv from 'dotenv';
import path from 'path';

// Load envs
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing environment variables!");
  process.exit(1);
}

// In v2 client, it is createClient
import { createClient as supabaseCreateClient } from '@supabase/supabase-js';
const supabase = supabaseCreateClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log("Testing insert into counseling_requests...");
  const { data, error } = await supabase
    .from('counseling_requests')
    .insert({
      name: "Test User",
      email: "test@example.com",
      certification: "AWS Solutions Architect",
      message: "This is a test message to debug the insertion failure."
    })
    .select();

  if (error) {
    console.error("❌ Insertion Failed!");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    console.error("Error Details:", error.details);
    console.error("Error Hint:", error.hint);
  } else {
    console.log("✅ Insertion Successful!");
    console.log("Inserted Data:", data);
  }
}

testInsert();
