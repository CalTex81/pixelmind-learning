import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.2/cors";

const MAX_NAME = 100;
const MAX_GRADE = 50;
const MAX_SCHOOL = 200;
const MAX_COURSE = 200;
const MAX_EXPERIENCE = 2000;
const MAX_SKILLS = 2000;
const MAX_QUESTIONS = 2000;
const MAX_COURSES = 10;

// Simple in-memory rate limiter (per function instance)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

function validateString(val: unknown, name: string, maxLen: number, required: boolean): string {
  if (val === null || val === undefined || val === "") {
    if (required) throw new Error(`${name} is required`);
    return "";
  }
  if (typeof val !== "string") throw new Error(`${name} must be a string`);
  const trimmed = val.trim();
  if (required && trimmed.length === 0) throw new Error(`${name} is required`);
  if (trimmed.length > maxLen) throw new Error(`${name} must be ${maxLen} characters or less`);
  return trimmed;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Rate limiting by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    const name = validateString(body.name, "Name", MAX_NAME, true);
    const grade = validateString(body.grade, "Grade", MAX_GRADE, true);
    const school = validateString(body.school, "School", MAX_SCHOOL, true);
    const experience = validateString(body.experience, "Experience", MAX_EXPERIENCE, true);
    const skills = validateString(body.skills, "Skills", MAX_SKILLS, false) || null;
    const questions = validateString(body.questions, "Questions", MAX_QUESTIONS, false) || null;
    const courseOther = validateString(body.course_other, "Other course", MAX_COURSE, false) || null;

    // Validate selected_courses
    if (!Array.isArray(body.selected_courses) || body.selected_courses.length === 0) {
      throw new Error("At least one course must be selected");
    }
    if (body.selected_courses.length > MAX_COURSES) {
      throw new Error(`Cannot select more than ${MAX_COURSES} courses`);
    }
    const selectedCourses: string[] = body.selected_courses.map((c: unknown, i: number) => {
      if (typeof c !== "string") throw new Error(`Course at index ${i} must be a string`);
      const trimmed = c.trim();
      if (trimmed.length > MAX_COURSE) throw new Error(`Course name must be ${MAX_COURSE} characters or less`);
      return trimmed;
    });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabaseAdmin.from("volunteer_signups").insert({
      name,
      grade,
      school,
      selected_courses: selectedCourses,
      course_other: courseOther,
      experience,
      skills,
      questions,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
