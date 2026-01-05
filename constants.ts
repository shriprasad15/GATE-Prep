import { ResourceItem, StudyPhase, DaySchedule } from './types';

export const RESOURCES: ResourceItem[] = [
  {
    name: "GO Classes Test Series",
    description: "The primary coach. 40+ Tests. Deep conceptual questions. Use for Topic Drills and Full Length Mocks.",
    type: "paid",
    tags: ["Core", "Mocks", "Hard"],
    url: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d"
  },
  {
    name: "IITM BS Stats 2 Notes",
    description: "High-yield short notes from the IITM BS Degree curriculum. Critical for Probability & Statistics revision.",
    type: "open-source",
    tags: ["Notes", "Stats", "Drive"],
    url: "https://drive.google.com/drive/folders/15I3rfd3kpBztpr3BzfDmZsskW0eDrmVV"
  },
  {
    name: "GATE Overflow",
    description: "The library. Gold standard for PYQs. Read the comments for deep discussions.",
    type: "open-source",
    tags: ["PYQs", "Discussion"],
    url: "https://gateoverflow.in/"
  },
  {
    name: "IITM BS MLP (ML Practice)",
    description: "Solutions to IITM BS MLP assignments. Harder, practical ML edge cases.",
    type: "open-source",
    tags: ["GitHub", "Machine Learning"],
    url: "https://github.com/varunram2001/CS2008-MLP"
  },
  {
    name: "AIMA Python (Russell & Norvig)",
    description: "Official repo for AI: A Modern Approach. Use tests/ folder for MCQ-style logic checks.",
    type: "open-source",
    tags: ["GitHub", "AI", "Search"],
    url: "https://github.com/aimacode/aima-python"
  },
  {
    name: "DSAI GATE Repo",
    description: "Curated list of specific notes, smaller mock questions, and links to NPTEL lectures mapped to the DA syllabus.",
    type: "open-source",
    tags: ["GitHub", "General"],
    url: "https://github.com/DS-AI-Gate/dsai-gate"
  }
];

export const INITIAL_SYLLABUS: StudyPhase[] = [
  {
    name: "Phase 1: Foundations (Prob & Stats, Linear Algebra)",
    tasks: [
      { id: "t1", title: "Probability Axioms & Bayes Theorem", category: "core", completed: true },
      { id: "t2", title: "Random Variables & Distributions", category: "core", completed: true },
      { id: "t3", title: "Linear Algebra: Eigenvalues/Vectors", category: "core", completed: true },
      { id: "t4", title: "Matrix Decomposition (SVD, PCA)", category: "core", completed: false },
      { id: "t5", title: "GO Classes Topic Test: Linear Algebra", category: "drill", completed: false },
      { id: "t18", title: "Revise Stats 2 Shortnotes (IITM BS)", category: "drill", completed: false },
    ]
  },
  {
    name: "Phase 2: The Core (ML & AI)",
    tasks: [
      { id: "t6", title: "Supervised Learning: Regression", category: "core", completed: false },
      { id: "t7", title: "Supervised Learning: Classification (SVM, DT)", category: "core", completed: false },
      { id: "t8", title: "Unsupervised: K-Means, Clustering", category: "core", completed: false },
      { id: "t9", title: "AI: Search Algorithms (A*, BFS, DFS)", category: "core", completed: false },
      { id: "t10", title: "Solve 20 IITM BS MLP Assignment Qs", category: "drill", completed: false },
      { id: "t11", title: "Check AIMA Repo Test Cases", category: "drill", completed: false },
    ]
  },
  {
    name: "Phase 3: Database & Warehousing",
    tasks: [
      { id: "t12", title: "ER Models & Relational Schema", category: "core", completed: false },
      { id: "t13", title: "SQL & Normalization", category: "core", completed: false },
      { id: "t14", title: "Warehousing Schemas (Star/Snowflake)", category: "core", completed: false },
    ]
  },
  {
    name: "Phase 4: Mocks & refinement",
    tasks: [
      { id: "t15", title: "GO Classes Full Mock 1", category: "mock", completed: false },
      { id: "t16", title: "GO Classes Full Mock 2", category: "mock", completed: false },
      { id: "t17", title: "GATE Overflow PYQ Marathon (2020-2023)", category: "mock", completed: false },
    ]
  }
];

export const MASTER_SCHEDULE: DaySchedule[] = [
  // Phase 1: Topic Mastery
  { 
    date: "Jan 05", day: "Sun", phase: "Topic Mastery", topic: "Probability & Stats", 
    session1: { title: "GATE MA PYQs (Prob)", desc: "Solve Conditional Prob & Bayes Theorem questions." },
    session2: { title: "Concept Fix: RVs", desc: "Review Discrete/Continuous RVs. Check IITM Stats 2 slides." },
    session3: { title: "IITM Graded Assignments", desc: "Solve Week 1-4 Graded Assignments." },
    resource: { name: "IITM Stats Drive", link: "https://drive.google.com/drive/folders/15I3rfd3kpBztpr3BzfDmZsskW0eDrmVV" }
  },
  { 
    date: "Jan 06", day: "Mon", phase: "Topic Mastery", topic: "Linear Algebra", 
    session1: { title: "GATE CS PYQs (LA)", desc: "Matrices, Rank, Eigenvalues. Quick fire solving." },
    session2: { title: "Deep Dive: SVD & PCA", desc: "Study SVD math specifically for DA. Use Gilbert Strang." },
    session3: { title: "GO Topic Test: LA", desc: "Take Linear Algebra Topic Test." },
    resource: { name: "GO Test Series", link: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d" }
  },
  { 
    date: "Jan 07", day: "Tue", phase: "Topic Mastery", topic: "ML (Supervised)", 
    session1: { title: "IITM MLP Assignments", desc: "Solve Regression, Logistic Reg, DT questions." },
    session2: { title: "Concept Fix: Bias-Variance", desc: "Understand L1/L2 Regularization math & Loss functions." },
    session3: { title: "GO Topic Test: ML 1", desc: "Take ML Supervised Topic Test." },
    resource: { name: "GO Test Series", link: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d" }
  },
  { 
    date: "Jan 08", day: "Wed", phase: "Topic Mastery", topic: "ML (Unsup) & Calc", 
    session1: { title: "Clustering & Neural Nets", desc: "Solve K-Means, Linkage types, Backprop steps." },
    session2: { title: "Optimization Math", desc: "Gradients, Convexity, Hessians. Check edge cases." },
    session3: { title: "GATE MA PYQs (Calculus)", desc: "Solve Maxima/Minima problems." },
    resource: { name: "GATE Overflow", link: "https://gateoverflow.in/tag/calculus" }
  },
  { 
    date: "Jan 09", day: "Thu", phase: "Topic Mastery", topic: "Algo/DS + Travel", 
    session1: { title: "GATE CS PYQs (DS)", desc: "Sorting, Hashing, Trees. Speed drill." },
    session2: { title: "Travel Prep", desc: "Download General Aptitude PYQs PDF." },
    session3: { title: "Travel & Aptitude", desc: "Solve 10 Aptitude Qs during travel." },
    resource: { name: "Aptitude PYQs", link: "https://gateoverflow.in/tag/general-aptitude" }
  },
  // Phase 2: Maintenance
  { 
    date: "Jan 10", day: "Fri", phase: "Maintenance", topic: "General Aptitude", 
    session1: { title: "Spatial Aptitude", desc: "Solve folding/cutting/rotation questions." },
    session2: { title: "Hackathon/Event", desc: "Focus on event. Keep brain active." },
    session3: { title: "Rest", desc: "Light revision if time permits." },
    resource: { name: "N/A", link: "#" }, isRest: true
  },
  { 
    date: "Jan 11", day: "Sat", phase: "Maintenance", topic: "General Aptitude", 
    session1: { title: "Logic & Quant", desc: "Solve 1 hour of GA questions." },
    session2: { title: "Hackathon/Event", desc: "Focus on event." },
    session3: { title: "Rest", desc: "-" },
    resource: { name: "N/A", link: "#" }, isRest: true
  },
  { 
    date: "Jan 12", day: "Sun", phase: "Maintenance", topic: "Rest Day", 
    session1: { title: "Review Notes", desc: "Light review of ML Formula sheet." },
    session2: { title: "Relax", desc: "S2T Holiday." },
    session3: { title: "Rest", desc: "-" },
    resource: { name: "N/A", link: "#" }, isRest: true
  },
  { 
    date: "Jan 13", day: "Mon", phase: "Maintenance", topic: "Reset & Travel", 
    session1: { title: "Travel Back", desc: "-" },
    session2: { title: "Reset Desk", desc: "Organize syllabus and notes." },
    session3: { title: "Warm Up", desc: "Solve 20 Python Output questions to get back in zone." },
    resource: { name: "Python Docs", link: "https://docs.python.org/3/" }
  },
  // Phase 3: War Mode
  { 
    date: "Jan 14", day: "Tue", phase: "War Mode", topic: "MOCK TEST 1", 
    session1: { title: "FULL LENGTH MOCK 1", desc: "GO Classes Mock. Strict 9am-12pm timing." },
    session2: { title: "Deep Analysis", desc: "Categorize mistakes: Concept vs Silly. Log them." },
    session3: { title: "Weakness Drill", desc: "Pick worst subject from Mock. Study from scratch." },
    resource: { name: "GO Test Series", link: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d" }
  },
  { 
    date: "Jan 15", day: "Wed", phase: "War Mode", topic: "DBMS & Warehouse", 
    session1: { title: "GATE CS PYQs (SQL)", desc: "Solve SQL & Normalization questions." },
    session2: { title: "Warehousing Concepts", desc: "Star/Snowflake schemas, OLAP operations." },
    session3: { title: "GO Topic Test: DBMS", desc: "Take DBMS Topic Test." },
    resource: { name: "GO Test Series", link: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d" }
  },
  { 
    date: "Jan 16", day: "Thu", phase: "War Mode", topic: "AI (Logic/Search)", 
    session1: { title: "Search Algos", desc: "A*, Minimax, Alpha-Beta pruning questions." },
    session2: { title: "Logic Concepts", desc: "Propositional/Predicate Logic. Resolution/Unification." },
    session3: { title: "IITM AI Assignment", desc: "Solve Search & Logic assignment questions." },
    resource: { name: "AIMA GitHub", link: "https://github.com/aimacode/aima-python" }
  },
  { 
    date: "Jan 17", day: "Fri", phase: "War Mode", topic: "AI (Uncertainty)", 
    session1: { title: "Probabilistic Models", desc: "Bayes Nets, d-separation, Markov Models." },
    session2: { title: "Inference Math", desc: "Variable Elimination & Exact Inference." },
    session3: { title: "GO Topic Test: AI", desc: "Take AI Topic Test." },
    resource: { name: "GO Test Series", link: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d" }
  },
  { 
    date: "Jan 18", day: "Sat", phase: "War Mode", topic: "MOCK TEST 2", 
    session1: { title: "FULL LENGTH MOCK 2", desc: "Strict timing. No distractions." },
    session2: { title: "6-Hour Analysis", desc: "Fix the top 3 weak topics found in mock." },
    session3: { title: "Repair", desc: "Continued analysis & drill." },
    resource: { name: "GO Test Series", link: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d" }
  },
  // Loop examples for context (Jan 19 onwards)
  { 
    date: "Jan 19", day: "Sun", phase: "War Mode", topic: "Deep Dive (Calc+Py)", 
    session1: { title: "Advanced Calculus", desc: "Solve tough vector calculus problems." },
    session2: { title: "Python Tracing", desc: "Complex list comprehensions & generators." },
    session3: { title: "Hard Drill", desc: "Standard book exercises." },
    resource: { name: "GATE Overflow", link: "https://gateoverflow.in/" }
  },
  { 
    date: "Jan 20", day: "Mon", phase: "War Mode", topic: "MOCK TEST 3", 
    session1: { title: "FULL LENGTH MOCK 3", desc: "Strict timing." },
    session2: { title: "Analysis", desc: "Identify & Log mistakes." },
    session3: { title: "Weakness Drill", desc: "Fix specific weak area." },
    resource: { name: "GO Test Series", link: "https://www.goclasses.in/s/pages/gate-da-test-series#1699851492489d" }
  }
];

export const SYSTEM_INSTRUCTION = `You are a specialized GATE Data Science & AI (DA) Coach.
Your goal is to help the student achieve a Rank < 100.
You strictly adhere to the following philosophy:
1. GO Classes is the primary source for concept depth and toughness.
2. GATE Overflow is the library for accuracy.
3. IITM BS Assignments (GitHub repos) and Stats 2 Shortnotes are key resources for edge cases.
4. Depth is better than breadth. Do not recommend new random sources.

When the user asks a question, answer with brevity, technical precision, and reference the specific resources defined above.
If they ask about a concept, explain it simply but link it to a likely "trick" question they might face in GATE.`;