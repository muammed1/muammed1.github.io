export type SkillGroupKind = 'professional' | 'tooling' | 'learning';

export interface SkillGroup {
  title: string;
  description?: string;
  items: readonly string[];
  kind: SkillGroupKind;
}

export const skillGroups = [
  {
    title: 'Backend engineering',
    description: 'Technologies and practices supported by professional production work.',
    items: [
      'PHP',
      'Laravel',
      'Enterprise application development',
      'Business logic implementation',
      'Production debugging and maintenance',
    ],
    kind: 'professional',
  },
  {
    title: 'Databases and reporting',
    items: [
      'MySQL',
      'Oracle Database',
      'SQL',
      'Relational database design',
      'Database views and reporting systems',
      'Financial-system logic',
    ],
    kind: 'professional',
  },
  {
    title: 'Application design and delivery',
    items: [
      'Business and requirements analysis',
      'Business workflow design',
      'Software architecture',
      'SaaS development',
      'Client communication',
      'Hardware integration',
    ],
    kind: 'professional',
  },
  {
    title: 'Web and development toolkit',
    description:
      'Documented technologies and tools; proficiency is not implied beyond the evidence shown elsewhere.',
    items: ['Blade', 'Bootstrap', 'JavaScript', 'HTML', 'CSS', 'Git', 'Composer', 'npm', 'Vite'],
    kind: 'tooling',
  },
  {
    title: 'AI engineering - current learning',
    items: [
      'AI Engineering fundamentals',
      'Large Language Models',
      'Prompt engineering',
      'AI-assisted software development',
      'AI application development',
    ],
    kind: 'learning',
  },
  {
    title: 'Backend and architecture - current learning',
    items: [
      'Advanced Laravel',
      'REST API design',
      'Authentication and authorization',
      'Scalable system design',
      'Layered and modular architecture',
      'Database and query optimization',
    ],
    kind: 'learning',
  },
] satisfies readonly SkillGroup[];
