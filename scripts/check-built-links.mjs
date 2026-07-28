import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(repositoryRoot, 'dist');
const errors = [];
const htmlCache = new Map();

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function filesIn(directory) {
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

function outputTarget(urlPath, sourceFile) {
  const decodedPath = decodeURIComponent(urlPath);
  const target = decodedPath.startsWith('/')
    ? path.join(outputDirectory, decodedPath.slice(1))
    : path.resolve(path.dirname(sourceFile), decodedPath);

  if (path.extname(target)) {
    return target;
  }

  return path.join(target, 'index.html');
}

async function htmlFor(file) {
  if (!htmlCache.has(file)) {
    htmlCache.set(file, await readFile(file, 'utf8'));
  }
  return htmlCache.get(file);
}

if (!(await exists(outputDirectory))) {
  console.error('Generated output is missing. Run npm run build before npm run check:links.');
  process.exit(1);
}

const htmlFiles = (await filesIn(outputDirectory)).filter((file) => file.endsWith('.html'));
const linkPattern = /(?:href|src)=["']([^"']+)["']/giu;

for (const sourceFile of htmlFiles) {
  const source = await htmlFor(sourceFile);

  for (const match of source.matchAll(linkPattern)) {
    const rawReference = match[1] ?? '';

    if (!rawReference || /^(?:https?:|mailto:|tel:|data:|javascript:)/iu.test(rawReference)) {
      continue;
    }

    const [rawPath, rawFragment] = rawReference.split('#', 2);
    const referencePath = (rawPath || path.basename(sourceFile)).split('?', 1)[0] ?? '';
    const target = outputTarget(referencePath, sourceFile);

    if (!(await exists(target))) {
      errors.push(`${relative(sourceFile)} references missing ${rawReference}.`);
      continue;
    }

    if (rawFragment && target.endsWith('.html')) {
      const targetHtml = await htmlFor(target);
      const escapedFragment = rawFragment.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const fragmentPattern = new RegExp(
        `\\bid=["']${escapedFragment}["']|\\bname=["']${escapedFragment}["']`,
        'u',
      );

      if (!fragmentPattern.test(targetHtml)) {
        errors.push(`${relative(sourceFile)} references missing fragment ${rawReference}.`);
      }
    }
  }
}

const requiredOutputs = [
  path.join(outputDirectory, 'index.html'),
  path.join(outputDirectory, '404.html'),
  path.join(outputDirectory, 'projects', 'index.html'),
  path.join(outputDirectory, 'resume', 'index.html'),
  path.join(outputDirectory, 'sitemap.xml'),
];

for (const requiredOutput of requiredOutputs) {
  if (!(await exists(requiredOutput))) {
    errors.push(`Required output ${relative(requiredOutput)} is missing.`);
  }
}

if (errors.length > 0) {
  console.error('Generated link validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Generated link validation passed across ${htmlFiles.length} HTML files.`);
}
