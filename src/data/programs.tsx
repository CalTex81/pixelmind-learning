import { Code, Box, BarChart3, Trophy, Calculator } from "lucide-react";

export interface CurriculumSection {
  week?: number;
  title: string;
  subtopics?: string[];
  topics?: string[];
  project?: string;
  description?: string;
  link?: { label: string; url: string };
}

export interface WeeklyBreakdown {
  week: number;
  title: string;
  description: string;
  topics: string[];
  project: string;
}

export interface Program {
  title: string;
  slug: string;
  description: string;
  difficulty: "Beginner" | "Intermediate";
  ageRange: string;
  icon: React.ReactNode;
  overview: string;
  learningObjectives: string[];
  weeklyBreakdown: WeeklyBreakdown[];
  curriculumTitle?: string;
  curriculumOutline?: CurriculumSection[];
  disclaimer?: string;
  prerequisites: string[];
  toolsSoftware: string[];
  toolsLinks?: Record<string, string>;
  outcomes: string[];
  classSchedule?: {
    day: string;
    time: string;
    dateRange: string;
  };
}

export const programs: Program[] = [
  {
    title: "Python 101",
    slug: "python-101",
    description:
      "Learn the fundamentals of Python through hands-on projects, problem-solving, and real-world applications.",
    difficulty: "Beginner",
    ageRange: "Ages 9-14",
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
    weeklyBreakdown: [
      {
        week: 1,
        title: "Week 1: Python Fundamentals & First Program",
        description: "Introduction to Python programming language, setting up development environment, and writing your first program.",
        topics: ["Introduction to Python", "Setting up PyCharm IDE", "Your first program", "Print statements and basic output", "Getting user input", "Comments and code organization"],
        project: "Create a simple greeting program that asks for user's name and displays a welcome message"
      },
      {
        week: 2,
        title: "Week 2: Variables, Data Types & Operations",
        description: "Understanding how to store and manipulate different types of data in Python.",
        topics: ["Variables and naming conventions", "Numbers (integers and floats)", "Strings and string formatting", "Boolean values", "Basic arithmetic operators", "Type casting and conversion"],
        project: "Build a calculator program that performs basic mathematical operations"
      },
      {
        week: 3,
        title: "Week 3: Control Flow & Decision Making",
        description: "Learning how programs make decisions and respond to different conditions.",
        topics: ["If, elif, and else statements", "Comparison operators", "Logical operators (and, or, not)", "Nested conditions", "Error handling with try-except"],
        project: "Create a quiz program that asks questions and provides feedback based on answers"
      },
      {
        week: 4,
        title: "Week 4: Data Structures & Loops",
        description: "Exploring ways to organize data and repeat actions efficiently.",
        topics: ["Lists and list operations", "Tuples and their uses", "Sets and set operations", "Dictionaries and key-value pairs", "For loops and iteration", "While loops and repetition"],
        project: "Develop a contact book program that stores and manages multiple contacts"
      },
      {
        week: 5,
        title: "Week 5: Functions & Modular Programming",
        description: "Breaking down complex problems into reusable code blocks.",
        topics: ["Creating and calling functions", "Parameters and arguments", "Return values", "Scope and global variables", "Importing modules", "Built-in Python functions"],
        project: "Build a text-based adventure game with multiple functions for different game mechanics"
      },
      {
        week: 6,
        title: "Week 6: Object-Oriented Programming & Final Project",
        description: "Introduction to object-oriented concepts and creating a comprehensive final project.",
        topics: ["Classes and objects", "Methods and attributes", "Inheritance basics", "Putting it all together", "Project planning and structure", "Code debugging and testing"],
        project: "Create a comprehensive program combining all learned concepts (student chooses project)"
      }
    ],
    curriculumTitle: "PixelMind Curriculum: Python",
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
    classSchedule: {
      day: "Mondays",
      time: "1pm-2pm PDT",
      dateRange: "June 15 - July 20"
    }
  },
  {
    title: "Intro to Computer-Aided Design (CAD)",
    slug: "intro-to-cad",
    description:
      "Explore 3D modeling, engineering design principles, and CAD tools used in modern product development.",
    difficulty: "Intermediate",
    ageRange: "Ages 12-14",
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
      { week: 1, title: "Week 1: Introduction to CAD & Software Setup", description: "Overview of CAD in industry, software setup, navigating the workspace.", topics: ["Overview of CAD in industry", "Introduction to Onshape interface", "Navigating the 3D workspace", "Understanding coordinate systems", "Basic file management", "Industry applications and career paths"], project: "Create a simple 2D sketch and explore the Onshape workspace" },
      { week: 2, title: "Week 2: 2D Sketching Fundamentals", description: "Lines, arcs, circles, constraints, and dimensioning.", topics: ["Creating basic shapes (lines, circles, rectangles)", "Understanding geometric constraints", "Dimensioning and measurements", "Sketch relationships and dependencies", "Editing and modifying sketches", "Best practices for clean sketches"], project: "Design a precise 2D technical drawing with proper dimensions" },
      { week: 3, title: "Week 3: 3D Modeling Basics", description: "Extrude, revolve, fillet, chamfer, and boolean operations.", topics: ["Extruding 2D sketches into 3D", "Revolve and sweep operations", "Fillet and chamfer tools", "Boolean operations (union, subtract, intersect)", "Working with multiple features", "Understanding design intent"], project: "Create a 3D object from 2D sketches using extrusion and revolve" },
      { week: 4, title: "Week 4: Advanced Features", description: "Patterns, mirrors, shells, and lofts for complex geometry.", topics: ["Patterns and arrays", "Mirror and symmetry tools", "Shell and wall thickness", "Loft and sweep for complex shapes", "Parametric modeling concepts", "Design for manufacturability"], project: "Design a complex object using advanced features like patterns and shells" },
      { week: 5, title: "Week 5: Assemblies", description: "Combining parts, applying joints and constraints, motion simulation.", topics: ["Creating assembly files", "Mating parts together", "Understanding degrees of freedom", "Motion simulation basics", "Exploded views and documentation", "Assembly constraints and relationships"], project: "Build a multi-part assembly with moving components" },
      { week: 6, title: "Week 6: Final Project & Presentation", description: "Designing, modeling, and presenting a complete product prototype.", topics: ["Project planning and requirements", "Advanced modeling techniques", "Creating engineering drawings", "Presentation and documentation", "Design optimization", "Portfolio development"], project: "Design and present a complete product prototype with documentation" }
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
    classSchedule: {
      day: "Tuesdays",
      time: "1pm-2pm PDT",
      dateRange: "June 16 - July 21"
    }
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
      { week: 1, title: "Week 1: What is Data Science?", description: "Introduction to data science, real-world applications, types of data.", topics: ["Data science overview", "Real-world applications", "Types of data", "Data science workflow", "Industry roles", "Ethics in data science"], project: "Explore a real dataset and identify key insights" },
      { week: 2, title: "Week 2: Data Collection & Cleaning", description: "Working with CSV files, handling missing values, data types.", topics: ["CSV file handling", "Missing values", "Data types", "Data cleaning techniques", "Data validation", "Documentation"], project: "Clean and prepare a messy dataset for analysis" },
      { week: 3, title: "Week 3: Data Visualization", description: "Creating charts and graphs with matplotlib and seaborn.", topics: ["Matplotlib basics", "Chart creation", "Advanced visualization with seaborn", "Chart types", "Data storytelling", "Custom plots"], project: "Create compelling visualizations from cleaned dataset" },
      { week: 4, title: "Week 4: Statistics Fundamentals", description: "Mean, median, mode, standard deviation, and correlation.", topics: ["Central tendency measures", "Standard deviation", "Correlation", "Statistical significance", "Hypothesis testing"], project: "Perform statistical analysis on dataset and draw conclusions" },
      { week: 5, title: "Week 5: Intro to Machine Learning", description: "Supervised learning, training/testing split, linear regression.", topics: ["ML concepts", "Supervised vs unsupervised", "Training/testing split", "Linear regression", "Model evaluation", "Overfitting"], project: "Build and evaluate a simple predictive model" },
      { week: 6, title: "Week 6: ML Project & Presentation", description: "Building a classification model and presenting findings.", topics: ["Project planning", "Advanced modeling", "Model optimization", "Presentations", "Communicating findings", "Next steps"], project: "Complete end-to-end ML project and present results" }
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
    classSchedule: {
      day: "Fridays",
      time: "1pm-2pm PDT",
      dateRange: "June 19 - July 24"
    }
  },
    {
    title: "Fundamentals of Algebra (ALG1)",
    slug: "fundamentals-of-algebra",
    description:
      "Master foundational algebra concepts including equations, functions, graphing, and problem-solving strategies.",
    difficulty: "Beginner",
    ageRange: "Ages 10-13",
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
      { week: 1, title: "Week 1: Expressions & Variables", description: "Order of operations, combining like terms, evaluating expressions.", topics: ["Order of operations", "Variables and constants", "Evaluating algebraic expressions", "Combining like terms", "Distributive property", "Real-world applications"], project: "Create and evaluate expressions representing real-world scenarios" },
      { week: 2, title: "Week 2: Equations & Inequalities", description: "Solving one-step and multi-step equations, graphing inequalities.", topics: ["One-step equations", "Multi-step equations", "Variables on both sides", "Graphing inequalities", "Solution sets", "Word problem applications"], project: "Solve and graph linear inequalities representing real constraints" },
      { week: 3, title: "Week 3: Linear Functions", description: "Slope, y-intercept, graphing lines, slope-intercept form.", topics: ["Function notation", "Domain and range", "Slope and rate of change", "Y-intercept", "Graphing linear functions", "Slope-intercept form"], project: "Model and analyze real-world linear relationships" },
      { week: 4, title: "Week 4: Systems of Equations", description: "Solving by substitution and elimination, graphical solutions.", topics: ["Solving by substitution", "Solving by elimination", "Graphical solutions", "Consistent and inconsistent systems", "Applications to real problems"], project: "Solve systems representing real-world scenarios" },
      { week: 5, title: "Week 5: Exponents & Polynomials", description: "Laws of exponents, multiplying polynomials, intro to factoring.", topics: ["Laws of exponents", "Negative and zero exponents", "Multiplying monomials", "Introduction to polynomials", "Basic factoring", "Scientific notation"], project: "Simplify and factor polynomial expressions" },
      { week: 6, title: "Week 6: Review & Problem Solving", description: "Cumulative review, word problems, and algebraic reasoning challenges.", topics: ["Comprehensive review of all topics", "Multi-step word problems", "Algebraic reasoning", "Problem-solving strategies", "Test preparation", "Final project presentation"], project: "Complete comprehensive algebra project demonstrating all learned skills" }
    ],
    disclaimer: undefined,
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
    classSchedule: {
      day: "Thursdays",
      time: "1pm-2pm PDT",
      dateRange: "June 18 - July 23"
    }
  },
];
