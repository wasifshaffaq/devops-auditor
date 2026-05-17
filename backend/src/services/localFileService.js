const fs = require('fs');
const path = require('path');

/**
 * Recursively gets all files in a directory.
 */
const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
};

/**
 * Reads specific DevOps files from a local directory for AI analysis.
 */
const getLocalRepoFiles = async (repoPath) => {
    try {
        const allFilePaths = getAllFiles(repoPath);
        
        const filesToAudit = allFilePaths
            .map(filePath => ({
                fullPath: filePath,
                relativeP: path.relative(repoPath, filePath)
            }))
            .filter(file => {
                const lowerPath = file.relativeP.toLowerCase();
                
                return (lowerPath.includes('dockerfile') || 
                       lowerPath.endsWith('.tf') || 
                       lowerPath.includes('jenkinsfile') || 
                       lowerPath.includes('.yml') || 
                       lowerPath.includes('.yaml') || 
                       lowerPath.endsWith('package.json'));
            })
            .sort((a, b) => {
                // Prioritize root level files (fewer slashes in path)
                const depthA = (a.relativeP.match(/[\\\/]/g) || []).length;
                const depthB = (b.relativeP.match(/[\\\/]/g) || []).length;
                return depthA - depthB;
            });

        // Limit to top 15 prioritized files
        const topFiles = filesToAudit.slice(0, 15);

        const fileContents = topFiles.map((file) => {
            const content = fs.readFileSync(file.fullPath, 'utf8');
            return {
                path: file.relativeP,
                content: content
            };
        });

        return fileContents;
    } catch (error) {
        console.error('Error reading local files:', error.message);
        throw new Error(`Failed to read repository files: ${error.message}`);
    }
};

module.exports = { getLocalRepoFiles };
