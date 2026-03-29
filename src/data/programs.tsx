import { Code, Box, BarChart3, Trophy, Calculator } from "lucide-react";

export interface CurriculumSection {
  title: string;
  subtopics?: string[];
  link?: { label: string; url: string };
}

export interface Program {
  title: string;
  slug: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  ageRange: string;
  icon: React.ReactNode;
  overview: string;
  learningObjectives: string[];
  weeklyBreakdown: { week: string; topic: string; details: string }[];
  curriculumOutline?: CurriculumSection[];
  curriculumTitle?: string;
  disclaimer?: string;
  prerequisites: string[];
  toolsSoftware: string[];
  toolsLinks?: Record<string, string>;
  outcomes: string[];
}

export const programs: Program[] = [
  {
    title: "Python 101",
    slug: "python-101",
    description:
      "Learn the fundamentals of Python through hands-on projects, problem-solving, and real-world applications.",
    difficulty: "Beginner",
    ageRange: "Ages 11–15",
    icon: <Code className="w-8 h-8" />,
    overview:
      "Python 101 introduces young learners to the world of programming using Python — one of the most popular and versatile languages in the world. Through interactive exercises, mini-projects, and guided challenges, students build a solid foundation in computational thinking and software development.",
    learningObjectives: [
      "Understand variables, data types, and operators",
      "Write conditional statements and loops",
      "Create and use functions",
      "Work with lists, dictionaries, and file I/O",
      "Debug and troubleshoot code independently",
      "Build a capstone project from scratch",
    ],
    weeklyBreakdown: [],
    curriculumTitle: "PixelMind Curriculum: Python",
    curriculumOutline: [
      {
        title: "Intro To Python & IDE Intro",
        link: { label: "PyCharm Community Edition", url: "https://www.jetbrains.com/pycharm/download/?section=windows" },
        subtopics: ["Printing", "Input"],
      },
      {
        title: "Data Types & Basic Commands",
        subtopics: ["Comments", "Variables", "Data Types", "Numbers", "Casting", "Strings", "String Formatting", "Concatenation", "Booleans", "Operators"],
      },
      {
        title: "Sample Program: Calculator",
      },
      {
        title: "If & Else Statements",
      },
      {
        title: "Managing Data",
        subtopics: ["Arrays", "Lists", "Tuples", "Sets", "Dictionaries"],
      },
      {
        title: "Loops",
        subtopics: ["While Loops", "For Loops"],
      },
      {
        title: "Functions",
        subtopics: ["Functions", "Scope", "Modules"],
      },
      {
        title: "Object-Oriented Programming",
        subtopics: ["Classes/Objects", "Inheritance", "Polymorphism", "Iterators"],
      },
      {
        title: "Important Library Classes",
        subtopics: ["Dates", "Math (review)", "JSON", "RegEx", "PIP"],
      },
      {
        title: "Lambda",
      },
      {
        title: "Match",
      },
      {
        title: "Python: Your Future",
      },
    ],
    disclaimer: "This class does not teach machine learning or AI topics, but rather introduces students to Python, a language that is commonly used for machine learning.",
    prerequisites: [
      "No prior programming experience required",
      "Basic computer literacy (typing, navigating files)",
      "Curiosity and willingness to problem-solve",
    ],
    toolsSoftware: [
      "PyCharm",
      "VS Code",
    ],
    toolsLinks: {
      "PyCharm": "https://www.jetbrains.com/pycharm/",
      "VS Code": "https://code.visualstudio.com/",
    },
    outcomes: [
      "Ability to write and run Python programs independently",
      "Understanding of core programming concepts transferable to other languages",
      "A completed capstone project for their portfolio",
      "Readiness for intermediate-level courses",
    ],
  },
  {
    title: "Intro to Computer-Aided Design (CAD)",
    slug: "intro-to-cad",
    description:
      "Explore 3D modeling, engineering design principles, and CAD tools used in modern product development.",
    difficulty: "Intermediate",
    ageRange: "Ages 12–16",
    icon: <Box className="w-8 h-8" />,
    overview:
      "This course introduces students to the world of Computer-Aided Design, teaching them how to create precise 3D models, understand engineering drawings, and think like a product designer. Students will use industry-standard tools to bring their ideas from concept to a digital prototype.",
    learningObjectives: [
      "Navigate CAD software interface and workspace",
      "Create 2D sketches and extrude into 3D models",
      "Apply constraints, dimensions, and geometric relationships",
      "Assemble multi-part designs",
      "Generate engineering drawings with proper annotations",
      "Design a final product prototype",
    ],
    weeklyBreakdown: [
      { week: "Week 1", topic: "Introduction to CAD", details: "Overview of CAD in industry, software setup, navigating the workspace." },
      { week: "Week 2", topic: "2D Sketching Fundamentals", details: "Lines, arcs, circles, constraints, and dimensioning." },
      { week: "Week 3", topic: "3D Modeling Basics", details: "Extrude, revolve, fillet, chamfer, and boolean operations." },
      { week: "Week 4", topic: "Advanced Features", details: "Patterns, mirrors, shells, and lofts for complex geometry." },
      { week: "Week 5", topic: "Assemblies", details: "Combining parts, applying joints and constraints, motion simulation." },
      { week: "Week 6", topic: "Final Project & Presentation", details: "Designing, modeling, and presenting a complete product prototype." },
    ],
    prerequisites: [
      "Basic understanding of geometry",
      "Comfort with using a computer and mouse",
      "Interest in engineering, architecture, or product design",
    ],
    toolsSoftware: [
      "Onshape (free, browser-based CAD)",
      "Tinkercad (introductory 3D modeling)",
      "Optional: Fusion 360 student license",
    ],
    outcomes: [
      "Proficiency in creating 3D models from scratch",
      "Understanding of engineering design workflows",
      "A completed product prototype in their portfolio",
      "Foundation for advanced CAD and 3D printing courses",
    ],
  },
  {
    title: "Data Science Exploration / Basics of Machine Learning",
    slug: "data-science-ml",
    description:
      "Discover data analysis, visualization, and introductory machine learning concepts using beginner-friendly tools.",
    difficulty: "Intermediate",
    ageRange: "Ages 13–17",
    icon: <BarChart3 className="w-8 h-8" />,
    overview:
      "This course takes students on a journey through the data science pipeline — from collecting and cleaning data to building simple machine learning models. Students will learn how data drives decisions in the real world and gain hands-on experience with tools used by professional data scientists.",
    learningObjectives: [
      "Understand what data science and machine learning are",
      "Collect, clean, and organize datasets",
      "Create meaningful visualizations and charts",
      "Apply basic statistical analysis",
      "Build and evaluate simple ML models (classification, regression)",
      "Present data-driven insights",
    ],
    weeklyBreakdown: [
      { week: "Week 1", topic: "What is Data Science?", details: "Introduction to data science, real-world applications, types of data." },
      { week: "Week 2", topic: "Data Collection & Cleaning", details: "Working with CSV files, handling missing values, data types." },
      { week: "Week 3", topic: "Data Visualization", details: "Creating charts and graphs with matplotlib and seaborn." },
      { week: "Week 4", topic: "Statistics Fundamentals", details: "Mean, median, mode, standard deviation, and correlation." },
      { week: "Week 5", topic: "Intro to Machine Learning", details: "Supervised learning, training/testing split, linear regression." },
      { week: "Week 6", topic: "ML Project & Presentation", details: "Building a classification model and presenting findings." },
    ],
    prerequisites: [
      "Basic Python knowledge (variables, loops, functions)",
      "Comfort with basic math (algebra level)",
      "Interest in patterns, trends, and problem-solving",
    ],
    toolsSoftware: [
      "Python 3.x with Jupyter Notebooks",
      "pandas, matplotlib, seaborn libraries",
      "scikit-learn (intro level)",
      "Google Colab",
    ],
    outcomes: [
      "Ability to analyze and visualize real-world datasets",
      "Understanding of core ML concepts",
      "A completed data science project",
      "Foundation for advanced AI/ML coursework",
    ],
  },
  {
    title: "ACSL Bootcamp",
    slug: "acsl-bootcamp",
    description:
      "Prepare for the American Computer Science League with focused lessons on Boolean algebra, data structures, and FSAs.",
    difficulty: "Advanced",
    ageRange: "Ages 13–18",
    icon: <Trophy className="w-8 h-8" />,
    overview:
      "The ACSL Bootcamp is an intensive preparation course for students competing in the American Computer Science League. Covering all major ACSL topics, this course blends theory with extensive practice problems to sharpen competitive programming skills and deepen CS knowledge.",
    learningObjectives: [
      "Master Boolean algebra and digital logic",
      "Understand and trace Finite State Automata (FSAs)",
      "Work with number systems (binary, octal, hex)",
      "Implement graph theory algorithms",
      "Solve LISP and prefix/postfix expression problems",
      "Complete timed practice contests",
    ],
    weeklyBreakdown: [
      { week: "Week 1", topic: "Number Systems & Bit Manipulation", details: "Binary, octal, hexadecimal conversions, bitwise operations." },
      { week: "Week 2", topic: "Boolean Algebra", details: "Logic gates, truth tables, simplification, De Morgan's laws." },
      { week: "Week 3", topic: "Data Structures", details: "Stacks, queues, trees, and graph representations." },
      { week: "Week 4", topic: "FSAs & Regular Expressions", details: "Designing and tracing finite state automata, pattern matching." },
      { week: "Week 5", topic: "LISP & Functional Concepts", details: "Prefix notation, recursive evaluation, LISP-style problems." },
      { week: "Week 6", topic: "Mock Contests & Review", details: "Full-length practice tests, timed challenges, and review sessions." },
    ],
    prerequisites: [
      "Proficiency in at least one programming language",
      "Strong algebra and logic skills",
      "Prior experience with basic data structures recommended",
    ],
    toolsSoftware: [
      "Python or Java for programming challenges",
      "ACSL practice problem archive",
      "Custom practice platform",
    ],
    outcomes: [
      "Readiness to compete in all ACSL contest rounds",
      "Deep understanding of CS theory topics",
      "Improved problem-solving speed and accuracy",
      "Competitive programming portfolio",
    ],
  },
  {
    title: "Fundamentals of Algebra (ALG1)",
    slug: "fundamentals-of-algebra",
    description:
      "Master foundational algebra concepts including equations, functions, graphing, and problem-solving strategies.",
    difficulty: "Beginner",
    ageRange: "Ages 11–14",
    icon: <Calculator className="w-8 h-8" />,
    overview:
      "Fundamentals of Algebra builds a strong mathematical foundation for students entering middle and high school. Through clear explanations, guided practice, and real-world problem sets, students develop fluency in algebraic thinking — a skill essential for all STEM fields.",
    learningObjectives: [
      "Solve linear equations and inequalities",
      "Understand and graph linear functions",
      "Work with exponents and polynomials",
      "Factor expressions and solve quadratics (intro)",
      "Apply algebra to word problems and real scenarios",
      "Build mathematical reasoning and proof skills",
    ],
    weeklyBreakdown: [
      { week: "Week 1", topic: "Expressions & Variables", details: "Order of operations, combining like terms, evaluating expressions." },
      { week: "Week 2", topic: "Equations & Inequalities", details: "Solving one-step and multi-step equations, graphing inequalities." },
      { week: "Week 3", topic: "Linear Functions", details: "Slope, y-intercept, graphing lines, slope-intercept form." },
      { week: "Week 4", topic: "Systems of Equations", details: "Solving by substitution and elimination, graphical solutions." },
      { week: "Week 5", topic: "Exponents & Polynomials", details: "Laws of exponents, multiplying polynomials, intro to factoring." },
      { week: "Week 6", topic: "Review & Problem Solving", details: "Cumulative review, word problems, and algebraic reasoning challenges." },
    ],
    prerequisites: [
      "Comfort with arithmetic (fractions, decimals, percentages)",
      "Basic understanding of number lines and coordinates",
      "No prior algebra experience needed",
    ],
    toolsSoftware: [
      "Desmos graphing calculator",
      "Khan Academy (supplementary)",
      "Printed/digital worksheet packets",
    ],
    outcomes: [
      "Solid foundation in algebra for future math courses",
      "Ability to solve real-world problems algebraically",
      "Improved logical and analytical thinking",
      "Readiness for geometry and Algebra II",
    ],
  },
];
