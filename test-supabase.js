const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envLocal = fs.readFileSync('.env.local', 'utf8');
const env = {};
envLocal.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
);

async function test() {
  console.log("Testing set_client_ip...");
  const { error: ipError } = await supabase.rpc("set_client_ip", { ip: "127.0.0.1" });
  if (ipError) {
    console.error("RPC Error:", ipError);
  } else {
    console.log("RPC Success.");
  }

  console.log("Testing insert...");
  const { data, error } = await supabase.from("leads").insert({
    name: "Test",
    email: "test@test.com",
    message: "Hello"
  });

  if (error) {
    console.error("Insert Error:", error);
  } else {
    console.log("Insert Success:", data);
  }
}

test();
