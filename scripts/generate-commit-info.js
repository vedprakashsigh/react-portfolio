import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  // Get the current commit SHA
  const commitSha = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

  // Get the remote origin URL
  let remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();

  // Convert SSH URL to HTTPS URL if necessary
  if (remoteUrl.startsWith('git@')) {
    // Format: git@github.com:user/repo.git
    const [, host, repo] = remoteUrl.match(/git@([^:]+):(.+)/) || [];
    if (host && repo) {
      remoteUrl = `https://${host}/${repo.replace(/\.git$/, '')}`;
    }
  } else if (remoteUrl.endsWith('.git')) {
    remoteUrl = remoteUrl.slice(0, -4);
  }

  // Ensure the URL is suitable for browser (no trailing slash, etc.)
  remoteUrl = remoteUrl.replace(/\/+$/, '');

  // Create the commit info object
  const commitInfo = {
    commitSha,
    repoUrl: remoteUrl
  };

  // Define the output file path (in the public directory)
  const outputPath = path.join(process.cwd(), 'public', 'commit-info.json');

  // Ensure the directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the JSON file
  fs.writeFileSync(outputPath, JSON.stringify(commitInfo, null, 2));

  console.log(`✅ Commit info generated:`, commitInfo);
} catch (error) {
  console.error('❌ Error generating commit info:', error.message);
  // In case of error, we still want to create a file to avoid 404s in the app
  const fallbackInfo = {
    commitSha: 'unknown',
    repoUrl: 'https://github.com/vedprakashsigh/ved-prakash-portfolio'
  };
  const outputPath = path.join(process.cwd(), 'public', 'commit-info.json');
  fs.writeFileSync(outputPath, JSON.stringify(fallbackInfo, null, 2));
  console.log(`⚠️ Using fallback commit info:`, fallbackInfo);
}