
CREATE TABLE public.student_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  student_age TEXT NOT NULL,
  selected_courses JSONB NOT NULL DEFAULT '[]'::jsonb,
  experience_level TEXT NOT NULL,
  goals TEXT NOT NULL,
  how_did_you_hear TEXT,
  agree_to_terms BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.student_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public inserts so unauthenticated students can register
CREATE POLICY "Allow public insert" ON public.student_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- No public read access to protect student PII
CREATE POLICY "No public read" ON public.student_registrations
  FOR SELECT USING (false);
