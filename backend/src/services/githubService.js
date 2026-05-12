const axios = require('axios');

/**
 * Fetches the list of files and content from a public GitHub repository.
 */
const fetchRepoFiles = async (repoUrl) => {
    try {
        // Extract owner and repo from URL
        const parts = repoUrl.replace('https://github.com/', '').split('/');
        const owner = parts[0];
        const repo = parts[1];

        const axiosConfig = {
            headers: {
                'User-Agent': 'DevOps-Polyglot-Auditor',
                ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
            }
        };

        // 1. Get Repo metadata to find the default branch (main vs master)
        const repoInfoUrl = `https://api.github.com/repos/${owner}/${repo}`;
        const repoInfo = await axios.get(repoInfoUrl, axiosConfig);
        const defaultBranch = repoInfo.data.default_branch;

        // 2. Get the tree (recursive) using the correct branch
        const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`;
        const response = await axios.get(treeUrl, axiosConfig);
        
        const filesToAudit = response.data.tree.filter(file => {
            const path = file.path.toLowerCase();
            return (path.includes('dockerfile') || 
                   path.endsWith('.tf') || 
                   path.includes('jenkinsfile') || 
                   path.includes('.yml') || 
                   path.includes('.yaml') || 
                   path === 'package.json') && file.type === 'blob';
        });

        // Limit to top 15 files
        const topFiles = filesToAudit.slice(0, 15);

        const fileContents = await Promise.all(topFiles.map(async (file) => {
            // Use raw.githubusercontent.com for easy content fetching
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${file.path}`;
            const contentResponse = await axios.get(rawUrl, axiosConfig);
            return {
                path: file.path,
                content: contentResponse.data
            };
        }));

        return fileContents;
    } catch (error) {
        console.error('Error fetching repo files:', error.response?.data?.message || error.message);
        throw new Error(`Failed to fetch repository files: ${error.response?.data?.message || error.message}`);
    }
};

module.exports = { fetchRepoFiles };
