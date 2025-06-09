import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://egjuixghmpjugmimttbu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnanVpeGdobXBqdWdtaW10dGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5MTEwMTMsImV4cCI6MjAxMTQ4NzAxM30.YngmPeGsGuY1vxgBLx98vFi3lUm6p5ff_Hu1giq-Z7c';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
