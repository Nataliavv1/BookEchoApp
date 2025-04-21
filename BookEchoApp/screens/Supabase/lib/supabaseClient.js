// Conté les Key del projecte en Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bizqtmcljmduxrqwmdsh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenF0bWNsam1kdXhycXdtZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMzk5NTcsImV4cCI6MjA1ODgxNTk1N30.6dYgFdNzCmgEJT_2xnkaDxSsWMjygFxIi_U0FNlzsEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

