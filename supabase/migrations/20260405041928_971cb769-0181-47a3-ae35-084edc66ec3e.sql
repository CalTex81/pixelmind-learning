
CREATE TABLE public.volunteer_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  school TEXT NOT NULL,
  selected_courses TEXT[] NOT NULL,
  course_other TEXT,
  experience TEXT NOT NULL,
  skills TEXT,
  questions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.volunteer_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (no auth required for public signup form)
CREATE POLICY "Anyone can submit a volunteer signup"
ON public.volunteer_signups
FOR INSERT
WITH CHECK (true);

-- Only authenticated admins should read signups (for now, block all reads from client)
CREATE POLICY "No public read access"
ON public.volunteer_signups
FOR SELECT
USING (false);
