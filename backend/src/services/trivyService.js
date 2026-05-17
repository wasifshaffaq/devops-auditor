const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Runs a Trivy security scan on a local directory.
 * Optimized for Cloud/Container usage by calling the 'trivy' binary directly.
 * 
 * @param {string} repoPath Absolute path to the cloned repository.
 * @returns {Promise<Object>} Structured vulnerability report.
 */
const runTrivyScan = (repoPath, onLog = () => {}) => {
    return new Promise((resolve, reject) => {
        // Step 1: Check if the 'trivy' binary is available in the environment
        // This works in our Docker container and local machines with Trivy installed.
        onLog('Verifying Trivy binary availability...', 'process');
        
        exec('trivy --version', (err) => {
            if (err) {
                onLog('Trivy binary not found. Falling back to Heuristic AI Mode.', 'warn');
                return resolve({ Results: [], status: 'TRIVY_NOT_FOUND' });
            }

            // Step 2: Execute scan using the local binary (much faster than docker-in-docker)
            const command = `trivy repo --format json --quiet "${repoPath}"`;
            
            onLog('Trivy binary active. Initiating deterministic security scan...', 'process');

            exec(command, { maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {
                if (error) {
                    onLog(`Trivy Analysis Interrupted: ${error.message}`, 'error');
                    return resolve({ Results: [], status: 'TRIVY_ERROR' });
                }

                try {
                    onLog('Decoding Trivy security manifest...', 'process');
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
                    issue: `${vuln.PkgName}: ${vuln.Title || (vuln.Description ? vuln.Description.slice(0, 100) : 'No description available')}...`,
                    severity: (vuln.Severity || 'medium').toLowerCase(),
                    source: 'Trivy Scanner'
                });
            });
        }
    });

    return simplified;
};

module.exports = { runTrivyScan, formatTrivyResults };
