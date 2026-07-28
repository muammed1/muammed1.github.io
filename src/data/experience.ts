export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: readonly string[];
  domains: readonly string[];
}

export const experiences = [
  {
    company: '4Automata',
    title: 'Software Engineer',
    startDate: '2023-11',
    endDate: '2026-07',
    summary:
      'Developed, maintained, and enhanced enterprise software modules across multiple healthcare management systems.',
    highlights: [
      'Implemented business features and maintained production systems.',
      'Debugged and resolved software defects across production modules.',
      'Analyzed business requirements and translated operational problems into technical solutions.',
      'Designed and improved business workflows.',
      'Worked directly with clients to understand and support their operational needs.',
    ],
    domains: [
      'Radiology',
      'Laboratory Management',
      'Clinics',
      'Emergency Department',
      'Health Insurance',
      'Fixed Assets Management',
    ],
  },
] satisfies readonly Experience[];
