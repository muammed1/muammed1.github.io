export interface Education {
  degree: string;
  institution: string;
  location: string;
  status: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Profile {
  name: string;
  initials: string;
  roles: readonly string[];
  headline: string;
  valueProposition: string;
  summary: readonly string[];
  availability: string;
  email: string;
  linkedin: string;
  github: string;
  education: Education;
  languages: readonly Language[];
  currentLearning: readonly string[];
}

export const profile = {
  name: 'Mohammad Zeno',
  initials: 'MZ',
  roles: ['Software Engineer', 'Backend Engineer', 'Aspiring AI Engineer'],
  headline: 'Backend engineering for dependable business software.',
  valueProposition:
    'I translate operational requirements into maintainable backend systems, business workflows, relational data models, and reporting tools.',
  summary: [
    'Software engineer focused on backend and enterprise applications, with professional experience in healthcare software and fitness-management systems.',
    'Experienced in requirements analysis, business workflow design, relational database modeling, financial systems, reporting, production maintenance, and hardware integration.',
    'Currently strengthening AI engineering foundations while continuing to deepen backend engineering and software architecture skills.',
  ],
  availability: 'Open to software engineering and backend engineering opportunities.',
  email: 'zenomahmmad1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/muhmmad-zeno-b5b4a31a0/',
  github: 'https://github.com/muammed1',
  education: {
    degree: "Bachelor's degree in Computer Engineering",
    institution: 'University of Aleppo',
    location: 'Aleppo, Syria',
    status: 'In progress',
  },
  languages: [
    { name: 'Arabic', proficiency: 'Native' },
    { name: 'English', proficiency: 'Professional working proficiency' },
  ],
  currentLearning: [
    'AI Engineering fundamentals',
    'Large Language Models',
    'Prompt engineering',
    'AI-assisted software development',
  ],
} satisfies Profile;
