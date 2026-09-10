import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iwsgtqodxbdtwosfmnhj.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3c2d0cW9keGJkdHdvc2ZtbmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjk1MjksImV4cCI6MjEwMzk0NTUyOX0.kvS_0Xopu7UfZaJEqY7SG-dtRvhVGRmbaZdZOnctc1Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
