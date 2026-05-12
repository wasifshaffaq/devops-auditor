const { fetchRepoFiles } = require('../src/services/githubService');
const axios = require('axios');

jest.mock('axios');

describe('githubService', () => {
    it('should fetch files from a valid repository URL', async () => {
        const mockRepoInfo = { data: { default_branch: 'master' } };
        const mockTree = {
            data: {
                tree: [
                    { path: 'Dockerfile', type: 'blob' },
                    { path: 'main.tf', type: 'blob' }
                ]
            }
        };
        const mockContent = { data: 'mock content' };

        axios.get.mockResolvedValueOnce(mockRepoInfo);
        axios.get.mockResolvedValueOnce(mockTree);
        axios.get.mockResolvedValue(mockContent);

        const files = await fetchRepoFiles('https://github.com/test/repo');
        
        expect(files).toHaveLength(2);
        expect(files[0].path).toBe('Dockerfile');
        expect(files[1].path).toBe('main.tf');
    });

    it('should throw an error if repo fetch fails', async () => {
        axios.get.mockRejectedValue(new Error('API Error'));

        await expect(fetchRepoFiles('https://github.com/invalid/repo'))
            .rejects.toThrow('Failed to fetch repository files');
    });
});
