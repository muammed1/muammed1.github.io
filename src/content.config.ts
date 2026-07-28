import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nonEmptyString = z.string().trim().min(1);
const optionalUrl = z.union([z.literal(''), z.url()]).optional();
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use the YYYY-MM date format.');

const site = defineCollection({
  loader: glob({
    base: './src/content/site',
    pattern: 'site.yml',
  }),
  schema: ({ image }) =>
    z.object({
      siteUrl: z.url(),
      siteName: nonEmptyString,
      defaultTitle: nonEmptyString,
      defaultDescription: nonEmptyString,
      socialPreview: z
        .object({
          image: image(),
          alt: nonEmptyString,
        })
        .optional(),
      language: z.string().regex(/^[a-z]{2}(?:-[A-Z]{2})?$/),
      brandRole: nonEmptyString,
      footerTagline: nonEmptyString,
      backToTopLabel: nonEmptyString,
      navigation: z.object({
        about: nonEmptyString,
        experience: nonEmptyString,
        skills: nonEmptyString,
        work: nonEmptyString,
        contact: nonEmptyString,
        resume: nonEmptyString,
      }),
      projectDetail: z.object({
        breadcrumbAriaLabel: nonEmptyString,
        homeLabel: nonEmptyString,
        projectsLabel: nonEmptyString,
        kicker: nonEmptyString,
        badgesAriaLabel: nonEmptyString,
        readCaseStudyLabel: nonEmptyString,
        visitLiveLabel: nonEmptyString,
        viewSourceLabel: nonEmptyString,
        summaryAriaLabel: nonEmptyString,
        contributionLabel: nonEmptyString,
        statusLabel: nonEmptyString,
        availabilityLabel: nonEmptyString,
        technologyHeading: nonEmptyString,
        capabilityHeading: nonEmptyString,
        tocAriaLabel: nonEmptyString,
        tocHeading: nonEmptyString,
        galleryKicker: nonEmptyString,
        galleryTitle: nonEmptyString,
        continueKicker: nonEmptyString,
        continueTitle: nonEmptyString,
        allProjectsLabel: nonEmptyString,
        resumeLabel: nonEmptyString,
        statuses: z.object({
          deployed: nonEmptyString,
          inDevelopment: nonEmptyString,
          archived: nonEmptyString,
        }),
        privacy: z.object({
          private: nonEmptyString,
          public: nonEmptyString,
        }),
      }),
      personJobTitles: z.array(nonEmptyString).min(1),
      personKnowsAbout: z.array(nonEmptyString).min(1),
    }),
});

const sectionHeadingSchema = z.object({
  eyebrow: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
});

const home = defineCollection({
  loader: glob({
    base: './src/content/home',
    pattern: 'home.yml',
  }),
  schema: z.object({
    hero: z.object({
      roles: z.array(nonEmptyString).min(1),
      availabilityLabel: nonEmptyString,
      primaryProjectId: nonEmptyString,
      primaryActionLabel: nonEmptyString,
      resumeActionLabel: nonEmptyString,
      contactActionLabel: nonEmptyString,
      actionsAriaLabel: nonEmptyString,
      factsAriaLabel: nonEmptyString,
      facts: z
        .array(
          z.object({
            label: nonEmptyString,
            value: nonEmptyString,
          }),
        )
        .min(1),
      visualLabel: nonEmptyString,
      visualTopLabel: nonEmptyString,
      visualBottomLabel: nonEmptyString,
    }),
    about: sectionHeadingSchema.extend({
      aiLearningNote: nonEmptyString,
      facts: z
        .array(
          z.object({
            label: nonEmptyString,
            value: nonEmptyString,
          }),
        )
        .min(1),
    }),
    experience: sectionHeadingSchema,
    skills: sectionHeadingSchema,
    featuredWork: sectionHeadingSchema.extend({
      projectId: nonEmptyString,
      statusLabel: nonEmptyString,
    }),
    projectsPage: z.object({
      title: nonEmptyString,
      description: nonEmptyString,
      eyebrow: nonEmptyString,
      heading: nonEmptyString,
      emptyMessage: nonEmptyString,
    }),
    approach: sectionHeadingSchema.extend({
      items: z
        .array(
          z.object({
            title: nonEmptyString,
            body: nonEmptyString,
          }),
        )
        .min(1),
    }),
    education: sectionHeadingSchema,
    contact: z.object({
      eyebrow: nonEmptyString,
      title: nonEmptyString,
      description: nonEmptyString,
    }),
  }),
});

const profile = defineCollection({
  loader: glob({
    base: './src/content/profile',
    pattern: 'profile.yml',
  }),
  schema: ({ image }) =>
    z.object({
      name: nonEmptyString,
      initials: nonEmptyString,
      roles: z.array(nonEmptyString).min(1),
      headline: nonEmptyString,
      valueProposition: nonEmptyString,
      summary: z.array(nonEmptyString).min(1),
      availability: nonEmptyString,
      email: z.email(),
      linkedin: z.url(),
      github: z.url(),
      portrait: z
        .object({
          image: image(),
          alt: nonEmptyString,
        })
        .optional(),
      resumePdf: z
        .union([
          z.literal(''),
          z.string().regex(/^\/resume\/[a-z0-9][a-z0-9._-]*\.pdf$/i, 'Use a PDF inside /resume/.'),
        ])
        .optional(),
      education: z.object({
        degree: nonEmptyString,
        institution: nonEmptyString,
        location: nonEmptyString,
        status: nonEmptyString,
      }),
      languages: z
        .array(
          z.object({
            name: nonEmptyString,
            proficiency: nonEmptyString,
          }),
        )
        .min(1),
      currentLearning: z.array(nonEmptyString).min(1),
      resume: z.object({
        title: nonEmptyString,
        description: nonEmptyString,
        displayedRoles: z.array(nonEmptyString).min(1),
        emailActionLabel: nonEmptyString,
        printActionLabel: nonEmptyString,
        downloadActionLabel: nonEmptyString,
        coreTechnologiesHeading: nonEmptyString,
        coreTechnologies: z.array(nonEmptyString).min(1),
        educationHeading: nonEmptyString,
        languagesHeading: nonEmptyString,
        professionalSummaryHeading: nonEmptyString,
        professionalSummary: nonEmptyString,
        experienceHeading: nonEmptyString,
        domainsLabel: nonEmptyString,
        selectedProject: z.object({
          heading: nonEmptyString,
          projectId: nonEmptyString,
          dateLabel: nonEmptyString,
          roleLabel: nonEmptyString,
          paragraphs: z.array(nonEmptyString).min(1),
        }),
        capabilitiesHeading: nonEmptyString,
        learningHeading: nonEmptyString,
        learningNote: nonEmptyString,
      }),
    }),
});

const experiences = defineCollection({
  loader: glob({
    base: './src/content/experiences',
    pattern: '*.yml',
  }),
  schema: z
    .object({
      order: z.number().int().nonnegative(),
      visible: z.boolean().default(true),
      company: nonEmptyString,
      title: nonEmptyString,
      startDate: yearMonth,
      endDate: z
        .union([yearMonth, z.literal(''), z.null()])
        .optional()
        .transform((value) => value || null),
      summary: nonEmptyString,
      highlights: z.array(nonEmptyString).min(1),
      domains: z.array(nonEmptyString).min(1),
    })
    .superRefine((experience, context) => {
      if (experience.endDate && experience.endDate < experience.startDate) {
        context.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: 'The end date cannot be earlier than the start date.',
        });
      }
    }),
});

const skills = defineCollection({
  loader: glob({
    base: './src/content/skills',
    pattern: '*.yml',
  }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    visible: z.boolean().default(true),
    title: nonEmptyString,
    description: z.string().trim().min(1).optional(),
    items: z.array(nonEmptyString).min(1),
    kind: z.enum(['professional', 'tooling', 'learning']),
  }),
});

const projectStatusSchema = z.enum(['deployed', 'in-development', 'archived']);
const projectPrivacySchema = z.enum(['public', 'private']);

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '*.md',
  }),
  schema: ({ image }) =>
    z.object({
      title: nonEmptyString,
      summary: nonEmptyString,
      role: nonEmptyString,
      published: z.boolean().default(false),
      featured: z.boolean().default(false),
      order: z.number().int().nonnegative().default(0),
      status: projectStatusSchema,
      privacy: projectPrivacySchema,
      technologies: z.array(nonEmptyString).min(1),
      capabilities: z.array(nonEmptyString).min(1),
      cover: z
        .object({
          image: image(),
          alt: nonEmptyString,
        })
        .optional(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: nonEmptyString,
            caption: z.string().trim().min(1).optional(),
          }),
        )
        .default([]),
      links: z
        .object({
          live: optionalUrl,
          source: optionalUrl,
        })
        .optional(),
      seo: z
        .object({
          title: z.string().trim().max(70).optional(),
          description: z.string().trim().max(170).optional(),
        })
        .optional(),
    }),
});

export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type ProjectPrivacy = z.infer<typeof projectPrivacySchema>;

export const collections = { site, home, profile, experiences, skills, projects };
