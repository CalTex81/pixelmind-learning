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

  const handleSubmit = (e: React.FormEvent) => {
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
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({ title: "Application submitted!", description: "Thank you for your interest in volunteering with PixelMind Learning." });
    }, 1200);
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
    <div className="relative min-h-screen">
      <PixelGrid />
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl">
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-primary"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-heading font-bold text-primary text-glow-cyan">
              Summer 2026 Recruitment
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base mt-2 leading-relaxed">
              PixelMind Learning is a branch of the Future Leaders Initiative, a 501(c)(3) nonprofit.
              We are looking for dedicated volunteers to help with planning, reaching out, and teaching classes this summer!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  What is your name? <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your answer"
                  className="border-border/50 bg-background/50"
                />
              </div>

              {/* Grade */}
              <div className="space-y-3">
                <Label className="text-foreground">
                  What grade are you in? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup value={grade} onValueChange={(v) => { setGrade(v); if (v !== "other") setGradeOther(""); }}>
                  {grades.map((g) => (
                    <div key={g} className="flex items-center space-x-2">
                      <RadioGroupItem value={g} id={`grade-${g}`} />
                      <Label htmlFor={`grade-${g}`} className="text-muted-foreground font-normal cursor-pointer">{g}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="grade-other" />
                    <Label htmlFor="grade-other" className="text-muted-foreground font-normal cursor-pointer">Other:</Label>
                    <Input
                      value={gradeOther}
                      onChange={(e) => { setGradeOther(e.target.value); setGrade("other"); }}
                      className="h-8 w-32 border-border/50 bg-background/50"
                      placeholder="Specify"
                    />
                  </div>
                </RadioGroup>
              </div>

              {/* School */}
              <div className="space-y-2">
                <Label htmlFor="school" className="text-foreground">
                  What school do you go to? <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Your answer"
                  className="border-border/50 bg-background/50"
                />
              </div>

              {/* Courses */}
              <div className="space-y-3">
                <Label className="text-foreground">
                  Which courses do you think you would be able to teach? <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Select "Other" if there are topics you're comfortable teaching that aren't listed.
                </p>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <div key={course} className="flex items-center space-x-2">
                      <Checkbox
                        id={course}
                        checked={selectedCourses.includes(course)}
                        onCheckedChange={() => toggleCourse(course)}
                      />
                      <Label htmlFor={course} className="text-muted-foreground font-normal cursor-pointer">{course}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="course-other"
                      checked={selectedCourses.includes("other")}
                      onCheckedChange={() => toggleCourse("other")}
                    />
                    <Label htmlFor="course-other" className="text-muted-foreground font-normal cursor-pointer">Other:</Label>
                    <Input
                      value={courseOther}
                      onChange={(e) => {
                        setCourseOther(e.target.value);
                        if (!selectedCourses.includes("other")) toggleCourse("other");
                      }}
                      className="h-8 flex-1 border-border/50 bg-background/50"
                      placeholder="Specify"
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-foreground">
                  For each course you selected, please explain your experience. <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Your answer"
                  className="border-border/50 bg-background/50 min-h-[100px]"
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-foreground">
                  Is there anything else you want to let us know about your skills?
                </Label>
                <Textarea
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Your answer"
                  className="border-border/50 bg-background/50"
                />
              </div>

              {/* Questions */}
              <div className="space-y-2">
                <Label htmlFor="questions" className="text-foreground">
                  Do you have any questions?
                </Label>
                <Textarea
                  id="questions"
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  placeholder="Your answer"
                  className="border-border/50 bg-background/50"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Button type="submit" variant="glow" size="lg" disabled={submitting} className="flex-1">
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
                <Button
                  type="button"
                  variant="glow-outline"
                  size="lg"
                  onClick={() => {
                    setName(""); setGrade(""); setGradeOther(""); setSchool("");
                    setSelectedCourses([]); setCourseOther(""); setExperience("");
                    setSkills(""); setQuestions("");
                  }}
                >
                  Clear form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JoinPage;
