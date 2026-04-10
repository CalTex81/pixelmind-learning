import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PixelGrid from "@/components/PixelGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { programs } from "@/data/programs";

const ThankYouPage = () => {
  const location = useLocation();
  const enrolledCourses = (location.state as any)?.enrolledCourses || [];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PixelGrid />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-primary mx-auto text-glow-cyan" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary text-glow-cyan mb-4">
            Registration Submitted!
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for registering for PixelMind Learning programs. We're excited to have you join our community!
          </p>

          {/* Enrolled Courses Section */}
          {enrolledCourses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-6 border border-border/50 mb-8"
            >
              <h2 className="text-xl font-heading font-semibold text-primary mb-4">Your Enrolled Courses</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  You have successfully enrolled in the following courses:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {enrolledCourses.map((enrolledCourse: any, index: number) => {
                    const program = programs.find(p => p.slug === enrolledCourse.course_slug);
                    return (
                      <div key={index} className="glass rounded-lg p-4 border border-border/50">
                        <h3 className="font-semibold text-foreground mb-2">{program?.title || enrolledCourse.course_slug}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Class Schedule:</strong> {program?.classSchedule ? `${program.classSchedule.day}, ${program.classSchedule.time} (${program.classSchedule.dateRange})` : 'Schedule information coming soon'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Course materials and access information will be sent to your email.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Steps Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6 border border-border/50 mb-8"
          >
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">What Happens Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Review Process</h3>
                  <p className="text-sm text-muted-foreground">Our team will review your registration within 24-48 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email Confirmation</h3>
                  <p className="text-sm text-muted-foreground">You'll receive a confirmation email with next steps and course details. All classes are completely free!</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Welcome!</h3>
                  <p className="text-sm text-muted-foreground">Gain access to the Google Classroom, where resources will be posted!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-xl p-6 border border-border/50 mb-8"
          >
            <h2 className="text-xl font-heading font-semibold text-primary mb-4">Questions? We're Here to Help!</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@pixelmindlearning.org"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                pixelmindlearning@gmail.org
              </a>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/#programs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Programs
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="glow" size="lg" className="w-full sm:w-auto">
                Return Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
