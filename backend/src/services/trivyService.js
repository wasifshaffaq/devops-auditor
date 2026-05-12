const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Runs a Trivy security scan on a local directory using Docker.
 * @param {string} repoPath Absolute path to the cloned repository.
 * @returns {Promise<Object>} Structured vulnerability report.
 */
const runTrivyScan = (repoPath) => {
    return new Promise((resolve, reject) => {
        // Check if docker exists first
        exec('docker -v', (err) => {
            if (err) {
                console.log("Docker not detected. Falling back to AI-only scan.");
                return resolve({ Results: [], status: 'DOCKER_NOT_AVAILABLE' });
            }

            const command = `docker run --rm -v "${repoPath}:/root/code" aquasec/trivy repo --format json --quiet /root/code`;
            
            console.log(`Running Trivy scan on: ${repoPath}`);

            exec(command, { maxBuffer: 1024 * 1024 * 5 }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Trivy Execution Error: ${error.message}`);
                    return resolve({ Results: [] });
                }

                try {
                    const report = JSON.parse(stdout);
                    resolve(report);
                } catch (parseError) {
                    console.error(`Failed to parse Trivy output: ${parseError.message}`);
                    resolve({ Results: [] });
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
