const { getLocalRepoFiles } = require('../services/localFileService');
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

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendStep = (type, message, data = null) => {
        res.write(`data: ${JSON.stringify({ type, message, data })}\n\n`);
    };

    const cleanUrl = repoUrl.trim();
    const tempDir = path.join(os.tmpdir(), `audit-${Date.now()}`);
    
    try {
        sendStep('info', `Initiating audit for: ${cleanUrl}`);
        
        // 1. Clone Repo Locally
        sendStep('process', 'Cloning repository into temporary container memory...');
        // Added -c http.sslVerify=false to handle SEC_E_UNTRUSTED_ROOT errors in restrictive environments
        await simpleGit().clone(cleanUrl, tempDir, ['--depth', '1', '-c', 'http.sslVerify=false']);
        sendStep('info', 'Repository cloned successfully.');

        // 2. Fetch specific files from the local clone for AI
        sendStep('process', 'Scanning local directory for DevOps configuration files...');
        const files = await getLocalRepoFiles(tempDir);
        
        if (files.length === 0) {
            sendStep('error', 'No DevOps files (Dockerfile, YAML, Terraform, etc.) were detected.');
            return res.end();
        }

        sendStep('info', `Detected ${files.length} relevant files for analysis.`);

        // 3. Run AI Analysis & Trivy Scan in Parallel
        sendStep('process', 'Orchestrating parallel AI and Docker security scans...');
        
        const [aiAnalysis, trivyRaw] = await Promise.all([
            analyzeDevOps(files, (msg, type) => sendStep(type, msg)),
            runTrivyScan(tempDir, (msg, type) => sendStep(type, msg))
        ]);

        sendStep('info', 'Merging all security signals into final report...');
        const isCloudMode = trivyRaw.status === 'DOCKER_NOT_AVAILABLE' || trivyRaw.status === 'TRIVY_ERROR' || trivyRaw.status === 'PARSE_ERROR';
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

        sendStep('success', 'Audit complete. Preparing professional report...', finalAnalysis);
        res.end();

    } catch (error) {
        console.error('Audit Error:', error.message);
        sendStep('error', `Audit Failed: ${error.message}`);
        res.end();
    } finally {
        // Cleanup temp files
        if (fs.existsSync(tempDir)) {
            console.log(`Cleaning up ${tempDir}`);
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    }
};

module.exports = { runAudit };
