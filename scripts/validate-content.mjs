import { access, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageDirectories = [
  path.join(repositoryRoot, 'src', 'content', 'site', 'images'),
  path.join(repositoryRoot, 'src', 'content', 'profile', 'images'),
  path.join(repositoryRoot, 'src', 'content', 'projects', 'images'),
];
const projectsDirectory = path.join(repositoryRoot, 'src', 'content', 'projects');
const homePath = path.join(repositoryRoot, 'src', 'content', 'home', 'home.yml');
const profilePath = path.join(repositoryRoot, 'src', 'content', 'profile', 'profile.yml');
const resumeDirectory = path.join(repositoryRoot, 'public', 'resume');

const allowedImageExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);
const allowedProjectMediaExtensions = new Set([...allowedImageExtensions, '.svg']);
const maximumImageBytes = 8 * 1024 * 1024;
const maximumResumeBytes = 15 * 1024 * 1024;
const errors = [];

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function filesIn(directory) {
  if (!(await exists(directory))) {
    return [];
  }

  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? filesIn(target) : [target];
    }),
  );

  return files.flat();
}

function relative(target) {
  return path.relative(repositoryRoot, target).replaceAll(path.sep, '/');
}

async function validateMediaDirectory(directory, allowedExtensions) {
  for (const file of await filesIn(directory)) {
    if (path.basename(file) === '.gitkeep') {
      continue;
    }

    const extension = path.extname(file).toLowerCase();

    if (!allowedExtensions.has(extension)) {
      errors.push(`${relative(file)} uses an unsupported media extension.`);
      continue;
    }

    const metadata = await stat(file);
    if (metadata.size > maximumImageBytes) {
      errors.push(`${relative(file)} exceeds the 8 MB image limit.`);
    }
  }
}

function normalizeMarkdownTarget(rawTarget) {
  const withoutTitle = rawTarget
    .trim()
    .replace(/^<|>$/g, '')
    .split(/\s+["']/u, 1)[0];
  return decodeURIComponent(withoutTitle ?? '');
}

async function validateMarkdownImages() {
  if (!(await exists(projectsDirectory))) {
    return;
  }

  const projectFiles = (await readdir(projectsDirectory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(projectsDirectory, entry.name));

  const markdownImage = /!\[([^\]]*)\]\(([^)]+)\)/gu;

  for (const projectFile of projectFiles) {
    const source = await readFile(projectFile, 'utf8');

    for (const match of source.matchAll(markdownImage)) {
      const alt = match[1]?.trim() ?? '';
      const target = normalizeMarkdownTarget(match[2] ?? '');

      if (!alt) {
        errors.push(`${relative(projectFile)} contains an image without alternative text.`);
      }

      if (!target || target.startsWith('data:')) {
        errors.push(`${relative(projectFile)} contains an invalid image target.`);
        continue;
      }

      if (/^https?:\/\//iu.test(target)) {
        errors.push(
          `${relative(projectFile)} references a remote image; upload it through Pages CMS instead.`,
        );
        continue;
      }

      const resolvedTarget = target.startsWith('/')
        ? path.join(repositoryRoot, 'public', target.slice(1))
        : path.resolve(path.dirname(projectFile), target);

      if (!(await exists(resolvedTarget))) {
        errors.push(
          `${relative(projectFile)} references missing image ${target.replaceAll('\\', '/')}.`,
        );
      }
    }
  }
}

async function validateResume() {
  if (!(await exists(profilePath))) {
    return;
  }

  const source = await readFile(profilePath, 'utf8');
  const match = source.match(/^resumePdf:\s*["']?([^"'\r\n#]+)["']?\s*$/mu);
  const resumePath = match?.[1]?.trim();

  if (!resumePath) {
    return;
  }

  if (!/^\/resume\/[^/]+\.pdf$/iu.test(resumePath)) {
    errors.push('profile.yml resumePdf must use /resume/<filename>.pdf.');
    return;
  }

  const file = path.join(repositoryRoot, 'public', resumePath.slice(1));
  if (!(await exists(file))) {
    errors.push(`profile.yml references missing resume ${resumePath}.`);
    return;
  }

  const metadata = await stat(file);
  if (metadata.size > maximumResumeBytes) {
    errors.push(`${relative(file)} exceeds the 15 MB PDF limit.`);
  }
}

async function validateResumeDirectory() {
  for (const file of await filesIn(resumeDirectory)) {
    if (path.basename(file) === '.gitkeep') {
      continue;
    }

    if (path.extname(file).toLowerCase() !== '.pdf') {
      errors.push(`${relative(file)} is not a PDF.`);
      continue;
    }

    const metadata = await stat(file);
    if (metadata.size > maximumResumeBytes) {
      errors.push(`${relative(file)} exceeds the 15 MB PDF limit.`);
    }
  }
}

function unquoteYamlScalar(value) {
  const withoutComment = value.replace(/\s+#.*$/u, '').trim();
  const quote = withoutComment[0];

  if ((quote === '"' || quote === "'") && withoutComment.at(-1) === quote) {
    return withoutComment.slice(1, -1).trim();
  }

  return withoutComment;
}

async function validateProjectReferences() {
  const projectFiles = (await filesIn(projectsDirectory)).filter(
    (file) => path.extname(file).toLowerCase() === '.md',
  );
  const projects = new Map();

  for (const projectFile of projectFiles) {
    const source = await readFile(projectFile, 'utf8');
    const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/u)?.[1] ?? '';
    const published = /^published:\s*true(?:\s*(?:#.*)?)?$/imu.test(frontmatter);
    projects.set(path.basename(projectFile, '.md'), { published, file: projectFile });
  }

  for (const contentFile of [homePath, profilePath]) {
    if (!(await exists(contentFile))) {
      continue;
    }

    const source = await readFile(contentFile, 'utf8');
    const referencePattern = /^\s*(?:primaryProjectId|projectId):\s*(.+?)\s*$/gmu;

    for (const match of source.matchAll(referencePattern)) {
      const projectId = unquoteYamlScalar(match[1] ?? '');
      if (!projectId) {
        errors.push(`${relative(contentFile)} contains an empty project reference.`);
        continue;
      }

      const project = projects.get(projectId);
      if (!project) {
        errors.push(`${relative(contentFile)} references missing project "${projectId}".`);
      } else if (!project.published) {
        errors.push(`${relative(contentFile)} references unpublished project "${projectId}".`);
      }
    }
  }
}

await validateMediaDirectory(imageDirectories[0], allowedImageExtensions);
await validateMediaDirectory(imageDirectories[1], allowedImageExtensions);
await validateMediaDirectory(imageDirectories[2], allowedProjectMediaExtensions);
await validateMarkdownImages();
await validateResume();
await validateResumeDirectory();
await validateProjectReferences();

if (errors.length > 0) {
  console.error('Content validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log('Content validation passed.');
}
