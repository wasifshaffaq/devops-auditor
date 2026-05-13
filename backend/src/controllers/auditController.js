const { fetchRepoFiles } = require('../services/githubService');
const { analyzeDevOps } = require('../services/aiService');
const { runTrivyScan, formatTrivyResults } = require('../services/trivyService');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const os = require('os');

const runAudit = async (req, res) => {
    const { repoUrl } = req.body;

    if (!repoUrl) {
        return res.status(400).json({ error: 'Repository URL is required' });
    }

    // Create a unique temp directory for this audit
    const tempDir = path.join(os.tmpdir(), `audit-${Date.now()}`);
    
    try {
        console.log(`Starting audit for: ${repoUrl}`);
        
        // 1. Clone Repo Locally for Docker Scanner
        console.log(`Cloning to ${tempDir}...`);
        await simpleGit().clone(repoUrl, tempDir, ['--depth', '1']);

        // 2. Fetch specific files for AI (Fast context)
        const files = await fetchRepoFiles(repoUrl);
        
        if (files.length === 0) {
            return res.status(404).json({ 
                error: 'No DevOps files (Dockerfile, YAML, Terraform, etc.) were detected in this repository. Our auditor needs configuration files to perform a review.' 
            });
        }

        // 3. Run AI Analysis & Trivy Scan in Parallel
        console.log("Running AI and Docker scans...");
        const [aiAnalysis, trivyRaw] = await Promise.all([
            analyzeDevOps(files),
            runTrivyScan(tempDir)
        ]);

        const isCloudMode = trivyRaw.status === 'DOCKER_NOT_AVAILABLE';
        const trivyVulnerabilities = formatTrivyResults(trivyRaw);

        // 4. Merge Results
        const finalAnalysis = {
            ...aiAnalysis,
            vulnerabilities: [
                ...aiAnalysis.vulnerabilities.map(v => ({ ...v, source: 'AI Auditor' })),
                ...trivyVulnerabilities
            ],
            mode: isCloudMode ? 'Cloud-Limited' : 'Full-Orchestrated'
        };

        res.json({
            success: true,
            repoUrl,
            analysis: finalAnalysis
        });

    } catch (error) {
        console.error('Audit Error:', error.message);
        res.status(500).json({ error: error.message });
    } finally {
        // Cleanup temp files
        if (fs.existsSync(tempDir)) {
            console.log(`Cleaning up ${tempDir}`);
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    }
};

module.exports = { runAudit };
