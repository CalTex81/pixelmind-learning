import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_SCHOOL = 200;
const MAX_AGE = 20;
const MAX_EXPERIENCE = 100;
const MAX_GOALS = 2000;
const MAX_HEAR = 500;
const MAX_COURSES = 20;
const MAX_COURSE_SLUG = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function vStr(val: unknown, name: string, max: number, required: boolean): string {
  if (val === null || val === undefined || val === "") {
    if (required) throw new Error(`${name} is required`);
    return "";
  }
  if (typeof val !== "string") throw new Error(`${name} must be a string`);
  const t = val.trim();
  if (required && t.length === 0) throw new Error(`${name} is required`);
  if (t.length > max) throw new Error(`${name} must be ${max} characters or less`);
  return t;
}

function vEmail(val: unknown, name: string): string {
  const s = vStr(val, name, MAX_EMAIL, true);
  if (!EMAIL_RE.test(s)) throw new Error(`${name} must be a valid email`);
  return s;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    const firstName = vStr(body.first_name, "First name", MAX_NAME, true);
    const lastName = vStr(body.last_name, "Last name", MAX_NAME, true);
    const email = vEmail(body.email, "Email");
    const phone = vStr(body.phone, "Phone", MAX_PHONE, false) || null;
    const parentName = vStr(body.parent_name, "Parent name", MAX_NAME, true);
    const parentEmail = vEmail(body.parent_email, "Parent email");
    const parentPhone = vStr(body.parent_phone, "Parent phone", MAX_PHONE, true);
    const studentAge = vStr(body.student_age, "Student age", MAX_AGE, true);
    const school = vStr(body.school, "School", MAX_SCHOOL, false) || null;
    const experienceLevel = vStr(body.experience_level, "Experience level", MAX_EXPERIENCE, true);
    const goals = vStr(body.goals, "Goals", MAX_GOALS, true);
    const howDidYouHear = vStr(body.how_did_you_hear, "How did you hear", MAX_HEAR, false) || null;
    const submittedAt = vStr(body.submitted_at, "Submitted at", 100, false) || null;

    if (!Array.isArray(body.selected_courses) || body.selected_courses.length === 0) {
      throw new Error("At least one course must be selected");
    }
    if (body.selected_courses.length > MAX_COURSES) {
      throw new Error(`Cannot select more than ${MAX_COURSES} courses`);
    }
    const selectedCourses = body.selected_courses.map((c: any, i: number) => {
      if (!c || typeof c !== "object") throw new Error(`Course at index ${i} invalid`);
      const slug = vStr(c.course_slug, `Course slug at ${i}`, MAX_COURSE_SLUG, true);
      const ratings = c.prerequisite_ratings;
      if (ratings !== undefined && ratings !== null && (typeof ratings !== "object" || Array.isArray(ratings))) {
        throw new Error(`Prerequisite ratings at ${i} must be an object`);
      }
      const cleanRatings: Record<string, number> = {};
      if (ratings) {
        const entries = Object.entries(ratings).slice(0, 50);
        for (const [k, v] of entries) {
          if (typeof k !== "string" || k.length > 200) continue;
          const n = Number(v);
          if (Number.isFinite(n)) cleanRatings[k] = n;
        }
      }
      return { course_slug: slug, prerequisite_ratings: cleanRatings };
    });

    const courseInfoForEmail = Array.isArray(body.course_info_for_email)
      ? body.course_info_for_email.slice(0, MAX_COURSES).map((c: any) => ({
          title: vStr(c?.title, "Course title", 200, false),
          day: vStr(c?.day, "Day", 50, false),
          time: vStr(c?.time, "Time", 100, false),
          dateRange: vStr(c?.dateRange, "Date range", 200, false),
        }))
      : [];

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const registrationId = crypto.randomUUID();

    const { error } = await supabaseAdmin.from("student_registrations").insert({
      id: registrationId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      parent_name: parentName,
      parent_email: parentEmail,
      parent_phone: parentPhone,
      student_age: studentAge,
      school,
      selected_courses: selectedCourses,
      experience_level: experienceLevel,
      goals,
      how_did_you_hear: howDidYouHear,
      status: "pending",
      submitted_at: submittedAt,
    });

    if (error) throw error;

    // Server-side trigger of the welcome email (uses service role auth).
    supabaseAdmin.functions.invoke("send-transactional-email", {
      body: {
        templateName: "welcome-registration",
        recipientEmail: email,
        idempotencyKey: `welcome-reg-${registrationId}`,
        templateData: { firstName, courses: courseInfoForEmail },
      },
    }).catch((err) => console.error("Welcome email failed:", err));

    return new Response(JSON.stringify({ success: true, id: registrationId }), {
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
