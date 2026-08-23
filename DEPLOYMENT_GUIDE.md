# MySituation - Standalone Setup & GitHub Pages Deployment Guide

This guide explains how to run, serve, rebuild, and deploy the **MySituation** application independently on any system, completely separated from the rest of the workspace and backend tools.

---

## 1. Project Directory Structure

When separated, the `MySituation` folder is completely self-contained:

```
MySituation/
├── .nojekyll                 # Prevents GitHub Pages Jekyll build processing
├── index.html                # Application entry point with relative library links
├── files.json                # Standalone dependency manifest
├── server.js                 # Local static HTTP testing server
├── deploy.js                 # Automated standalone GitHub push & deployment script
├── package.json              # Standalone Node.js package manifest
├── DEPLOYMENT_GUIDE.md       # This guide
├── js/                       # Application view pages and components
│   ├── AccuDrawValuation.js
│   ├── OverviewPage.js
│   ├── ValuationPage.js
│   ├── AiPerspectivePage.js
│   ├── CaretakerBiasPage.js
│   ├── CurrentWorkPage.js
│   ├── ElderAdvocacyPage.js
│   ├── NotesPage.js
│   ├── ValueEmberLogo.js
│   └── SnareDrumAnimation.js
├── library/                  # Bundled runtime dependencies
│   ├── recursi.js
│   ├── RecursiLoader.js
│   ├── DomBasics.js
│   ├── UITools.js
│   └── VideoPlayer.js
├── images/                   # Diagram & exhibit images
└── AIImages/                 # AI visual comparison exhibits
```

---

## 2. Serving Locally (Self-Hosting)

You can serve this project locally using Node.js without any third-party npm packages.

### Start local server:
```bash
node server.js [optionalPort]
# Default port: 8085
```

Or via npm:
```bash
npm start
```

Then open http://localhost:8085/ in your web browser.

---

## 3. Key Deployment Requirements for GitHub Pages

To ensure the app renders correctly on GitHub Pages (`https://<username>.github.io/<repository>/`):

1. **`.nojekyll` File**: Must be present in the repository root. This instructs GitHub Pages to bypass Jekyll processing, preventing file drop issues with special asset paths.
2. **Relative Paths**:
   - `index.html` must use relative script paths (`library/recursi.js` and `files.json`).
   - `files.json` must list local scripts as `js/...` and library scripts as `DomBasics.js`, `UITools.js`, etc.
   - JavaScript components must reference images relative to root (`images/...` and `AIImages/...`).
3. **Bundled Library Files**: All required runtime utilities (`DomBasics.js`, `UITools.js`, `VideoPlayer.js`, `recursi.js`, `RecursiLoader.js`) are housed directly in `library/`.

---

## 4. Deployment Workflow

### Option A: Using the Standalone `deploy.js` Script

`MySituation` includes a dedicated Node.js deployment script that handles git initialization, committing, and force-pushing directly to GitHub.

1. Open a command prompt or terminal in the `MySituation` folder.
2. Ensure Git is installed on your system.
3. Run the deploy script:
```bash
node deploy.js --repo=https://github.com/<YOUR_USERNAME_OR_ORG>/situation.git --branch=main
```

Or via npm:
```bash
npm run deploy -- --repo=https://github.com/<YOUR_USERNAME_OR_ORG>/situation.git
```

---

### Option B: Manual Git Commands

If you prefer executing Git commands manually:

1. **Initialize Git Repository** (if not already initialized):
```bash
git init
git checkout -b main
```

2. **Stage and Commit All Files**:
```bash
git add .
git commit -m "Deploy MySituation standalone application"
```

3. **Link Remote Repository**:
```bash
git remote add origin https://github.com/<YOUR_USERNAME_OR_ORG>/situation.git
# If remote already exists, update URL:
# git remote set-url origin https://github.com/<YOUR_USERNAME_OR_ORG>/situation.git
```

4. **Push to GitHub**:
```bash
git push -u origin main --force
```

---

## 5. Enabling GitHub Pages on GitHub.com

1. Go to your repository on GitHub (`https://github.com/<YOUR_USERNAME_OR_ORG>/situation`).
2. Click **Settings** -> **Pages** (under *Code and automation*).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `gh-pages`) and folder `/ (root)`.
   - Click **Save**.
4. Your site will be live within 1-2 minutes at:
   `https://<YOUR_USERNAME_OR_ORG>.github.io/situation/`
