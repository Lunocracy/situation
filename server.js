const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8085;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

function sendJSON(res, status, data) {
  if (res.headersSent) return;
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  res.end(JSON.stringify(data));
}

function handleDeploy(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let repoUrl = process.env.GITHUB_REPO_URL || '';
    let branch = 'main';
    let commitMsg = 'Automated deployment from Situation Workspace';

    try {
      if (body) {
        const parsed = JSON.parse(body);
        if (parsed.repoUrl) repoUrl = parsed.repoUrl.trim();
        if (parsed.branch) branch = parsed.branch.trim();
        if (parsed.commitMsg) commitMsg = parsed.commitMsg.trim();
      }
    } catch (e) {}

    if (!repoUrl) {
      try {
        repoUrl = execSync('git remote get-url origin', { cwd: PUBLIC_DIR, encoding: 'utf8' }).trim();
      } catch (e) {
        return sendJSON(res, 400, {
          success: false,
          error: 'Remote GitHub repository URL is required. Set GITHUB_REPO_URL or add a remote origin.'
        });
      }
    }

    const deployLogs = [];
    function run(cmd) {
      deployLogs.push('$ ' + cmd);
      try {
        const stdout = execSync(cmd, { cwd: PUBLIC_DIR, encoding: 'utf8' });
        if (stdout && stdout.trim()) deployLogs.push(stdout.trim());
        return true;
      } catch (err) {
        deployLogs.push('❌ Error: ' + (err.stderr || err.message));
        return false;
      }
    }

    const noJekyll = path.join(PUBLIC_DIR, '.nojekyll');
    if (!fs.existsSync(noJekyll)) {
      fs.writeFileSync(noJekyll, '', 'utf8');
      deployLogs.push('[OK] Created .nojekyll');
    }

    run('git checkout -B ' + branch);
    run('git add .');
    run('git commit -m "' + commitMsg.replace(/"/g, '\\"') + '" --allow-empty');

    try {
      run('git remote add origin ' + repoUrl);
    } catch (e) {
      run('git remote set-url origin ' + repoUrl);
    }

    const pushSuccess = run('git push -u origin ' + branch + ' --force');

    sendJSON(res, pushSuccess ? 200 : 500, {
      success: pushSuccess,
      repoUrl,
      branch,
      log: deployLogs.join('\\n')
    });
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const pathname = url.pathname;

  if (pathname === '/api/ping' || pathname === '/api/status') {
    return sendJSON(res, 200, {
      status: 'online',
      project: 'MySituation',
      port: PORT,
      gitReady: fs.existsSync(path.join(PUBLIC_DIR, '.git'))
    });
  }

  if (req.method === 'POST' && pathname === '/api/deploy') {
    return handleDeploy(req, res);
  }

  let cleanPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(PUBLIC_DIR, cleanPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + pathname);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🌐 MySituation server running at: http://localhost:${PORT}/`);
  console.log(`📦 Serving folder: ${PUBLIC_DIR}`);
});
