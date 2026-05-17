const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Runs a Trivy security scan on a local directory using Docker.
 * @param {string} repoPath Absolute path to the cloned repository.
 * @returns {Promise<Object>} Structured vulnerability report.
 */
const runTrivyScan = (repoPath, onLog = () => {}) => {
    return new Promise((resolve, reject) => {
        // Check if docker exists first
        onLog('Checking for Docker environment...', 'process');
        exec('docker -v', (err) => {
            if (err) {
                onLog('Docker not detected. Falling back to Cloud Mode (AI Analysis only).', 'warn');
                return resolve({ Results: [], status: 'DOCKER_NOT_AVAILABLE' });
            }

            const command = `docker run --rm -v "${repoPath}:/root/code" aquasec/trivy repo --format json --quiet /root/code`;
            
            onLog('Docker detected. Initiating Trivy security scan...', 'process');

            exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
                if (error) {
                    if (error.message.includes('failed to connect') || error.message.includes('daemon is running')) {
                        onLog('Docker daemon unreachable. Falling back to Cloud Mode.', 'warn');
                        return resolve({ Results: [], status: 'DOCKER_NOT_AVAILABLE' });
                    }
                    onLog(`Trivy Execution Error: ${error.message}`, 'error');
                    return resolve({ Results: [], status: 'TRIVY_ERROR' });
                }

                try {
                    onLog('Parsing Trivy security report...', 'process');
                    const report = JSON.parse(stdout);
                    resolve({ ...report, status: 'SUCCESS' });
                } catch (parseError) {
                    onLog(`Failed to parse Trivy output: ${parseError.message}`, 'error');
                    resolve({ Results: [], status: 'PARSE_ERROR' });
                }
            });
        });
    });
};

/**
 * Simplifies the heavy Trivy report for the frontend.
 */
const formatTrivyResults = (trivyReport) => {
    const simplified = [];
    if (!trivyReport.Results) return simplified;

    trivyReport.Results.forEach(result => {
        if (result.Vulnerabilities) {
            result.Vulnerabilities.forEach(vuln => {
                simplified.push({
                    file: result.Target,
                    issue: `${vuln.PkgName}: ${vuln.Title || vuln.Description.slice(0, 100)}...`,
                    severity: vuln.Severity.toLowerCase(),
                    source: 'Trivy Scanner'
                });
            });
        }
    });

    return simplified;
};

module.exports = { runTrivyScan, formatTrivyResults };
