-- Fix: Restrict student_registrations INSERT policy to enforce status='pending'
ALTER POLICY "Allow public insert" ON public.student_registrations
WITH CHECK (status = 'pending');
