import { execFileSync } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const findings = [];

const secretPatterns = [
  ['private key', /-----BEGIN (?:RSA |OPENSSH |EC |DSA |PGP )?PRIVATE KEY-----/u],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9_]{36,}|github_pat_[A-Za-z0-9_]{40,})\b/u],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/u],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/u],
  ['OpenAI API key', /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b/u],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/u],
  ['Stripe secret key', /\bsk_(?:live|test)_[A-Za-z0-9]{24,}\b/u],
  ['credential-bearing URL', /\bhttps?:\/\/[^/\s:@]+:[^/\s@]+@/u],
];

const sensitiveFilename =
  /(?:^|\/)(?:\.env(?:\..+)?|id_(?:rsa|dsa|ecdsa|ed25519)|credentials?|secrets?)$|(?:\.(?:key|pem|p12|pfx))$/iu;
const localPathPattern =
  /(?:[A-Z]:\\Users\\|file:\/\/\/|(?:^|[\s"'=(])\/(?:Users|home)\/[^/\s]+\/)/mu;

function git(...arguments_) {
  return execFileSync('git', ['-C', repositoryRoot, ...arguments_], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}

function scanText(source, location) {
  for (const [label, pattern] of secretPatterns) {
    if (pattern.test(source)) {
      findings.push(`${label} pattern detected in ${location}`);
    }
  }

  if (localPathPattern.test(source)) {
    findings.push(`local filesystem path detected in ${location}`);
  }
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

const workingFiles = git('ls-files', '--cached', '--others', '--exclude-standard')
  .split(/\r?\n/u)
  .filter(Boolean);

for (const file of workingFiles) {
  const absoluteFile = path.join(repositoryRoot, file);
  if (!(await exists(absoluteFile))) {
    continue;
  }

  if (sensitiveFilename.test(file.replaceAll('\\', '/'))) {
    findings.push(`sensitive filename present in working tree: ${file}`);
  }

  const buffer = await readFile(absoluteFile);
  if (buffer.includes(0)) {
    continue;
  }

  scanText(buffer.toString('utf8'), `working tree file ${file}`);
}

const historicalNames = git('log', '--all', '--name-only', '--pretty=format:')
  .split(/\r?\n/u)
  .filter(Boolean);

for (const file of new Set(historicalNames)) {
  if (sensitiveFilename.test(file.replaceAll('\\', '/'))) {
    findings.push(`sensitive filename present in Git history: ${file}`);
  }
}

const history = git(
  'log',
  '--all',
  '--patch',
  '--no-ext-diff',
  '--no-color',
  '--format=__COMMIT__%H',
);

let commit = 'unknown';
let patch = '';

for (const line of history.split(/\r?\n/u)) {
  if (line.startsWith('__COMMIT__')) {
    if (patch) {
      scanText(patch, `Git history commit ${commit.slice(0, 12)}`);
    }
    commit = line.slice('__COMMIT__'.length);
    patch = '';
    continue;
  }

  patch += `${line}\n`;
}

if (patch) {
  scanText(patch, `Git history commit ${commit.slice(0, 12)}`);
}

const uniqueFindings = [...new Set(findings)];

if (uniqueFindings.length > 0) {
  console.error('Public-repository audit failed:');
  for (const finding of uniqueFindings) {
    console.error(`- ${finding}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Public-repository audit passed across ${workingFiles.length} current files and complete Git history.`,
  );
}
