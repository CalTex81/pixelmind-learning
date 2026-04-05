-- Remove the permissive public INSERT policy
DROP POLICY IF EXISTS "Anyone can submit a volunteer signup" ON public.volunteer_signups;