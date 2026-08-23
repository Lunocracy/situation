/**
 * Standalone GitHub Deployment Script for MySituation
 * Usage: node deploy.js --repo=https://github.com/<user>/<repo>.git [--branch=main]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
function getArg(flag, fallback) {
  const match = args.find(a => a.startsWith(flag + '='));
  if (match) return match.split('=')[1];
  const idx = args.indexOf(flag);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];
  return fallback;
}

const repoUrl = getArg('--repo', process.env.GITHUB_REPO_URL || '');
const branch = getArg('--branch', 'main');
const workingDir = __dirname;

console.log('🚀 Initiating MySituation Standalone Deployment...');
console.log('Working Directory:', workingDir);

if (!repoUrl) {
  console.error('❌ Error: Remote GitHub repository URL is required.');
  console.log('Usage: node deploy.js --repo=https://github.com/<username>/<repo>.git');
  process.exit(1);
}

function runCmd(cmd) {
  console.log('  $ ' + cmd);
  try {
    const stdout = execSync(cmd, { cwd: workingDir, encoding: 'utf8', stdio: 'inherit' });
    return true;
  } catch (err) {
    console.error('  ❌ Command failed:', cmd);
    return false;
  }
}

// 1. Ensure .nojekyll exists
const noJekyllPath = path.join(workingDir, '.nojekyll');
if (!fs.existsSync(noJekyllPath)) {
  fs.writeFileSync(noJekyllPath, '');
  console.log('  [OK] Created .nojekyll');
}

// 2. Git setup & push sequence
console.log('\n📦 Executing Git Deployment Sequence...');

if (!fs.existsSync(path.join(workingDir, '.git'))) {
  runCmd('git init');
}

runCmd('git checkout -b ' + branch);
runCmd('git add .');
runCmd('git commit -m "Automated deployment of MySituation application" --allow-empty');

try {
  runCmd('git remote add origin ' + repoUrl);
} catch (e) {
  runCmd('git remote set-url origin ' + repoUrl);
}

runCmd('git push -u origin ' + branch + ' --force');

console.log('\n✨ Deployment completed successfully to:', repoUrl);
