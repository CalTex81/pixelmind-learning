import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import PixelGrid from "@/components/PixelGrid";

const courses = [
  "Python 101 (Basics of Python programming)",
  "Intro to Computer-Aided Design (CAD)",
  "ACSL Bootcamp",
  "Fundamentals of Algebra (ALG1)",
];

const grades = ["8th", "9th"];

const JoinPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeOther, setGradeOther] = useState("");
  const [school, setSchool] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courseOther, setCourseOther] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [questions, setQuestions] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !school.trim() || (!grade && !gradeOther.trim()) || selectedCourses.length === 0 || !experience.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill out all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-volunteer-signup", {
        body: {
          name: name.trim(),
          grade: grade === "other" ? gradeOther.trim() : grade,
          school: school.trim(),
          selected_courses: selectedCourses.filter((c) => c !== "other"),
          course_other: selectedCourses.includes("other") ? courseOther.trim() || null : null,
          experience: experience.trim(),
          skills: skills.trim() || null,
          questions: questions.trim() || null,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSubmitted(true);
      toast({ title: "Application submitted!", description: "Thank you for your interest in volunteering with PixelMind Learning." });
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again later.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <PixelGrid />
        <Card className="relative z-10 max-w-md w-full mx-4 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-4xl">🎉</div>
            <h2 className="text-2xl font-heading font-bold text-primary">Thank You!</h2>
            <p className="text-muted-foreground">
              Your application has been submitted. We'll be in touch soon!
            </p>
            <Button variant="glow" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <PixelGrid />
      <Card className="relative z-10 max-w-md w-full mx-4 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-4">
          <div className="text-4xl">🔒</div>
          <h2 className="text-2xl font-heading font-bold text-primary">Recruitment Closed</h2>
          <p className="text-muted-foreground">
            Mentor recruitment for Summer 2026 is now closed. Check back soon for our next session!
          </p>
          <Button variant="glow" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinPage;
