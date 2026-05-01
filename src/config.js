// ╔══════════════════════════════════════════════════════════════╗
// ║  vasanth.jar — Portfolio Configuration                       ║
// ║  Edit this single file to update all portfolio content.      ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── Personal Info (whoami screen) ───────────────────────────────
export const profile = {
  name: 'Vasanth Kumar Nimmiti',
  role: 'Backend Developer',
  stack: 'Java · Spring Boot · MySQL · AWS',
  status: 'Open to opportunities ✓',
  dob: new Date(2005, 5, 7), // June 7, 2005 — used for uptime calc
};

// ─── Main Menu Header ────────────────────────────────────────────
export const menuHeader = {
  title: 'VASANTH | Backend Developer',
  // subtitle: 'KL University | CSE | 2025', // uncomment to show
};

// ─── Boot Sequence Lines ─────────────────────────────────────────
export const bootLines = [
  { text: '> Checking system dependencies...', delay: 300 },
  { text: '> Loading Java Runtime (JDK 17)...', delay: 400 },
  { text: '> Starting Spring Boot context...', delay: 400 },
  { text: '> Connecting to MySQL...', delay: 300 },
  { text: '> Mounting AWS S3 bucket...', delay: 300 },
  { text: '> Loading vasanth.jar...', delay: 500 },
  { text: '> Initializing personality.exe...', delay: 300 },
];

// ─── Skills (ls skills/) ─────────────────────────────────────────
export const skillCategories = [
  {
    name: 'LANGUAGES',
    skills: [
      { name: 'Java', level: 80 },
      { name: 'Python', level: 60 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    name: 'FRAMEWORKS',
    skills: [
      { name: 'Spring Boot', level: 70 },
      { name: 'Spring MVC', level: 70 },
    ],
  },
  {
    name: 'CLOUD & TOOLS',
    skills: [
      { name: 'AWS S3', level: 60 },
      { name: 'MySQL', level: 80 },
      { name: 'Git', level: 70 },
    ],
  },
  {
    name: 'CONCEPTS',
    skills: [
      { name: 'REST APIs', level: 80 },
      { name: 'DSA', level: 70 },
      { name: 'Microservices', level: 60 },
    ],
  },
];

// ─── Projects (ls projects/) ─────────────────────────────────────
export const projects = [
  // {
  //   id: 1,
  //   name: 'Discharge Genius',
  //   status: 'DEPLOYED',
  //   stack: 'Spring Boot · MySQL · AWS S3 · Amplify',
  //   desc: 'AI-powered hospital discharge summary generator\nthat automates medical documentation workflows.',
  //   github: '#',
  //   live: '#',
  // },
  // {
  //   id: 2,
  //   name: 'Project Pipeline',
  //   status: 'DEPLOYED',
  //   stack: 'Java · Spring Boot · MySQL · REST API',
  //   desc: 'End-to-end project management API\nwith role-based access and real-time tracking.',
  //   github: '#',
  //   live: '#',
  // },
];

// ─── Experience (cat experience.log) ─────────────────────────────
// Set showExperience to true when you have experience to display.
// It will automatically appear as option [3] in the menu.
export const showExperience = false;
export const experience = [
  {
    company: 'Your Company Name',
    role: 'Software Engineer Intern',
    duration: 'Month Year - Month Year',
    work: 'Description of the work you did at this company.',
  },
  // Add more entries as needed:
  // {
  //   company: 'Another Company',
  //   role: 'Backend Developer Intern',
  //   duration: 'Jan 2025 - Mar 2025',
  //   work: 'Built REST APIs with Spring Boot\nDeployed to AWS EC2.',
  // },
];

// ─── Academics (cat academics.log) ───────────────────────────────
export const academics = [
  {
    tag: 'B.Tech',
    lines: [
      { text: 'KL University, Vijayawada', color: 'text-terminal-white' },
      { text: 'Computer Science & Engineering', color: 'text-terminal-green' },
      { text: 'CGPA : 9.31', color: 'text-terminal-amber' },
      { text: 'Year : 2024 - 2027', color: 'text-terminal-dim' },
    ],
  },
  {
    tag: 'Diploma',
    lines: [
      { text: 'Sai Ganapathi Engineering College', color: 'text-terminal-white' },
      { text: 'Computer Engineering', color: 'text-terminal-green' },
      { text: 'Percentage : 91.51%', color: 'text-terminal-amber' },
      { text: 'Year : 2021 - 2024', color: 'text-terminal-dim' },
    ],
  },
  {
    tag: 'High School',
    lines: [
      { text: 'Bhashyam E.M. High School', color: 'text-terminal-white' },
    ],
  },
];

// ─── Certifications (cat certifications.log) ─────────────────────
export const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issued: 'June 03, 2025',
    expires: 'June 03, 2028',
    status: 'Certified ✓',
    credlyUrl: 'https://www.credly.com/badges/9e22cff6-a979-44a9-8718-13c5c6444b69/public_url',
    credlyShort: 'credly.com/badges/9e22cff6',
  },
];

// ─── Achievements (cat achievements.log) ─────────────────────────
export const achievements = [
  { year: '2024', text: 'AWS Certified Cloud Practitioner' },
  { year: '2024', text: 'DTCC Interview → reached TR2 Round' },
  { year: '2024', text: 'CGPA 9.31' },
  { year: '2025', text: 'JPMC Code for Good → HireVue cleared' },
];

// ─── LeetCode (fetched live on achievements screen) ──────────────
export const leetcode = {
  username: 'Vasanth0706',
  profileUrl: 'https://leetcode.com/u/Vasanth0706/',
};

// ─── Contact (./contact.sh) ──────────────────────────────────────
export const contact = {
  email: 'vasanthkumarnimmiti07@gmail.com',
  linkedin: {
    label: 'linkedin.com/in/vasanthkumarnimmiti07',
    url: 'https://www.linkedin.com/in/vasanthkumarnimmiti07/',
  },
  github: {
    label: 'github.com/Vasanth-0706',
    url: 'https://github.com/Vasanth-0706',
  },
  resumeUrl: 'https://vasanth-nimmiti-portfolio.s3.ap-south-1.amazonaws.com/vasanth_resume.pdf',
};
