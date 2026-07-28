import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(repositoryRoot, '.pages.yml');
const errors = [];

let config;

try {
  config = parse(await readFile(configPath, 'utf8'));
} catch (error) {
  errors.push(`.pages.yml is not valid YAML: ${error instanceof Error ? error.message : error}`);
}

if (config) {
  if (!Array.isArray(config.media) || config.media.length === 0) {
    errors.push('.pages.yml must define at least one media source.');
  }

  if (!Array.isArray(config.content) || config.content.length === 0) {
    errors.push('.pages.yml must define at least one content entry.');
  }

  for (const [label, entries] of [
    ['media', config.media],
    ['content', config.content],
  ]) {
    if (!Array.isArray(entries)) {
      continue;
    }

    const names = new Set();
    for (const entry of entries) {
      if (!entry?.name) {
        errors.push(`Every ${label} entry must have a name.`);
      } else if (names.has(entry.name)) {
        errors.push(`Duplicate ${label} name "${entry.name}" in .pages.yml.`);
      } else {
        names.add(entry.name);
      }
    }
  }

  const mediaNames = new Set(config.media?.map((entry) => entry.name) ?? []);
  const contentNames = new Set(config.content?.map((entry) => entry.name) ?? []);

  if (!mediaNames.has('profile_images')) {
    errors.push('.pages.yml must expose the profile_images media source.');
  }

  if (!contentNames.has('profile') || !contentNames.has('projects')) {
    errors.push('.pages.yml must expose both profile and projects content.');
  }

  if (config.settings?.content?.merge !== true) {
    errors.push('.pages.yml must preserve unmanaged content keys with settings.content.merge.');
  }
}

if (errors.length > 0) {
  console.error('Pages CMS configuration validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log('Pages CMS configuration passed.');
}
