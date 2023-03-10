import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://arfwvmlzvrvdvxmttjej.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZnd2bWx6dnJ2ZHZ4bXR0amVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyNjkxNDgsImV4cCI6MTk5MDg0NTE0OH0.JFnbaO6w8jqWF1FAREsvrR3IdNE0r61LHVu7AZoUPtU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// const {data, error} = supabase.from('todo').select('*')
