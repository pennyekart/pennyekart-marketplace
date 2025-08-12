import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evceeoeiqorxlzcgofqj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Y2Vlb2VpcW9yeGx6Y2dvZnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MDg5ODUsImV4cCI6MjA3MDM4NDk4NX0.9S_DIKT1RAMzCQUZbMkq5hY9Xdg-TMcmzCz0_rAaPvg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);