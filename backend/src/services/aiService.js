const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeDevOps = async (files) => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error('Invalid or missing GEMINI_API_KEY in .env file.');
    }

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
        You are a Senior DevOps Security Auditor. Analyze these configuration files.
        Identify security vulnerabilities, infrastructure best practices, and provide a summary with a score (1-10).

        IMPORTANT: Your response must be a valid JSON object. Do not include any text before or after the JSON.

        Required JSON Structure:
        {
            "summary": "overall summary",
            "score": 8,
            "vulnerabilities": [{ "file": "path", "issue": "description", "severity": "high/med/low" }],
            "recommendations": ["list of improvements"],
            "infrastructure": [{ "type": "S3/EC2/Docker", "name": "resource-name", "status": "predicted" }]
        }

        Files to analyze:
        ${files.map(f => `File: ${f.path}\nContent:\n${f.content}\n---`).join('\n')}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Final cleanup just in case there are markdown markers
        text = text.replace(/```json\n?/, '').replace(/\n?```/, '').trim();
        
        return JSON.parse(text);
    } catch (error) {
        console.error('Error in AI Analysis:', error.message);
        throw new Error('AI Analysis failed: ' + error.message);
    }
};

module.exports = { analyzeDevOps };
