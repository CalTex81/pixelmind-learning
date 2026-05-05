import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { programs } from "@/data/programs";
import PixelGrid from "@/components/PixelGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { syncStudentRegistrationsToSheets } from "@/integrations/google-sheets/sync";

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    studentAge: "",
    school: "",
    selectedCourses: [] as string[],
    courseRatings: {} as Record<string, Record<string, number>>,
    experienceLevel: "",
    goals: "",
    howDidYouHear: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCourseSelection = (courseSlug: string, isSelected: boolean) => {
    setFormData(prev => {
      const newSelectedCourses = isSelected 
        ? [...prev.selectedCourses, courseSlug]
        : prev.selectedCourses.filter(c => c !== courseSlug);
      
      const newCourseRatings = { ...prev.courseRatings };
      if (!isSelected) {
        delete newCourseRatings[courseSlug];
      }
      
      return {
        ...prev,
        selectedCourses: newSelectedCourses,
        courseRatings: newCourseRatings
      };
    });
  };

  const handlePrerequisiteRating = (courseSlug: string, prerequisite: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      courseRatings: {
        ...prev.courseRatings,
        [courseSlug]: {
          ...prev.courseRatings[courseSlug],
          [prerequisite]: rating
        }
      }
    }));
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.selectedCourses.length === 0) {
      toast({
        title: "Course Selection Required",
        description: "Please select at least one course to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const registrationId = crypto.randomUUID();
      const now = new Date();
      const readableDate = now.toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const selectedCoursesWithRatings = formData.selectedCourses.map(courseSlug => ({
        course_slug: courseSlug,
        prerequisite_ratings: formData.courseRatings[courseSlug] || {}
      }));

      const courseNames = formData.selectedCourses
        .map(slug => programs.find(p => p.slug === slug)?.title)
        .filter(Boolean)
        .join(", ");

      const { error } = await supabase.from('student_registrations' as any).insert({
        id: registrationId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        parent_name: formData.parentName,
        parent_email: formData.parentEmail,
        parent_phone: formData.parentPhone,
        student_age: formData.studentAge,
        school: formData.school,
        selected_courses: selectedCoursesWithRatings,
        experience_level: formData.experienceLevel,
        goals: formData.goals,
        how_did_you_hear: formData.howDidYouHear || null,
        status: 'pending',
        submitted_at: readableDate
      } as any);

      if (error) {
        throw error;
      }


      // Send welcome email with course details and calendar links
      const courseInfoForEmail = formData.selectedCourses
        .map(slug => programs.find(p => p.slug === slug))
        .filter(Boolean)
        .map(p => ({
          title: p!.title,
          day: p!.classSchedule?.day || '',
          time: p!.classSchedule?.time || '',
          dateRange: p!.classSchedule?.dateRange || '',
        }));

      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'welcome-registration',
          recipientEmail: formData.email,
          idempotencyKey: `welcome-reg-${registrationId}`,
          templateData: {
            firstName: formData.firstName,
            courses: courseInfoForEmail,
          },
        },
      }).catch(err => console.error('Welcome email failed:', err));

      // Sync to Google Sheets
      syncStudentRegistrationsToSheets().catch(err => 
        console.error('Google Sheets sync failed:', err)
      );

      setIsSubmitting(false);
      toast({
        title: "Registration Submitted!",
        description: "We'll be in touch within 24-48 hours with next steps. Check your email for a welcome message!",
      });
      navigate("/thank-you", { state: { enrolledCourses: selectedCoursesWithRatings } });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
      console.error('Registration error:', error);
    }
  };

  const selectedCourseDetails = formData.selectedCourses.map(slug => programs.find(p => p.slug === slug)).filter(Boolean);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PixelGrid />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              to="/#programs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Programs
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary text-glow-cyan mb-4">
              Class Registration
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join our community of young learners and start your journey into technology and creativity.
            </p>
            <p className="mt-4 inline-block text-secondary font-heading text-sm uppercase tracking-wider border border-secondary/40 bg-secondary/10 rounded-md px-3 py-1 underline">
              Registration closes May 31st
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Information */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-primary text-glow-cyan">Student Information</CardTitle>
                <CardDescription>Tell us about the student who will be taking the course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Student Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentAge">Student Age *</Label>
                  <p className="text-sm text-muted-foreground mb-2">Please select your age based on how old you will be by June 1, 2026</p>
                  <Select value={formData.studentAge} onValueChange={(value) => handleInputChange("studentAge", value)} required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="11">11 years</SelectItem>
                      <SelectItem value="12">12 years</SelectItem>
                      <SelectItem value="13">13 years</SelectItem>
                      <SelectItem value="14">14 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School *</Label>
                  <Input
                    id="school"
                    value={formData.school}
                    onChange={(e) => handleInputChange("school", e.target.value)}
                    placeholder="Enter your school name"
                    required
                    className="bg-background/50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Parent/Guardian Information */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-primary text-glow-cyan">Parent/Guardian Information</CardTitle>
                <CardDescription>For students under 18, we need parent/guardian contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Full Name *</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => handleInputChange("parentName", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Parent Email *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Parent Phone *</Label>
                    <Input
                      id="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Selection */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-primary text-glow-cyan">Course Selection</CardTitle>
                <CardDescription>Choose the program you'd like to join</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Label>Select Courses *</Label>
                  <div className="space-y-3">
                    {programs.map((program) => {
                      const isSelected = formData.selectedCourses.includes(program.slug);
                      return (
                        <div key={program.slug} className="glass rounded-lg p-4 border border-border/50">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={program.slug}
                              checked={isSelected}
                              onCheckedChange={(checked) => handleCourseSelection(program.slug, checked as boolean)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-primary">{program.icon}</span>
                                <Label htmlFor={program.slug} className="font-medium text-foreground cursor-pointer">
                                  {program.title}
                                </Label>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{program.description}</p>
                              <div className="flex gap-4 text-xs">
                                <span className="text-muted-foreground">{program.ageRange}</span>
                                <span className="text-secondary font-heading uppercase tracking-wider">{program.difficulty}</span>
                              </div>
                              
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="mt-4 space-y-3"
                                >
                                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                                    <h5 className="font-semibold text-primary mb-2 text-sm">How well do you meet these prerequisites?</h5>
                                    <div className="space-y-2">
                                      {program.prerequisites.map((prereq, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                          <span className="text-sm text-muted-foreground">{prereq}</span>
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground">1</span>
                                            <input
                                              type="range"
                                              min="1"
                                              max="3"
                                              value={formData.courseRatings[program.slug]?.[prereq] || 1}
                                              onChange={(e) => handlePrerequisiteRating(program.slug, prereq, parseInt(e.target.value))}
                                              className="w-20"
                                            />
                                            <span className="text-xs text-muted-foreground">3</span>
                                            <span className="text-sm font-medium text-primary ml-2">
                                              {formData.courseRatings[program.slug]?.[prereq] || 1}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Programming Experience *</Label>
                  <RadioGroup value={formData.experienceLevel} onValueChange={(value) => handleInputChange("experienceLevel", value)} required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner">No prior experience</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="some" id="some" />
                      <Label htmlFor="some">Some experience (1-6 months)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="experienced" id="experienced" />
                      <Label htmlFor="experienced">Experienced (6+ months)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-primary text-glow-cyan">Additional Information</CardTitle>
                <CardDescription>Help us understand your goals and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">What are your learning goals? *</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    placeholder="Tell us what you hope to achieve with this course..."
                    required
                    className="bg-background/50 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="howDidYouHear">How did you hear about us? *</Label>
                  <Select value={formData.howDidYouHear} onValueChange={(value) => handleInputChange("howDidYouHear", value)} required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="friend">Friend or Family</SelectItem>
                      <SelectItem value="school">School or Teacher</SelectItem>
                      <SelectItem value="event">Event or Workshop</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="glow"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[200px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Submit Registration
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
