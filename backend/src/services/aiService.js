const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeDevOps = async (files) => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error('Invalid or missing GEMINI_API_KEY in .env file.');
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        You are a Senior DevOps Security Auditor. I will provide you with the content of several configuration files from a repository.
        Your task is to:
        1. Identify security vulnerabilities (e.g., hardcoded secrets, root users in Docker, open ports).
        2. Identify infrastructure best practice violations (e.g., missing resource limits, insecure terraform providers).
        3. Provide a brief "Senior Engineer" summary of the overall architecture.
        4. Give a "Score" from 1-10.

        Format your response as a JSON object with the following structure:
        {
            "summary": "overall summary",
            "score": 8,
            "vulnerabilities": [{ "file": "path", "issue": "description", "severity": "high/med/low" }],
            "recommendations": ["list of improvements"],
            "infrastructure": [{ "type": "S3/EC2/Docker", "name": "resource-name", "status": "predicted" }]
        }

        Files:
        ${files.map(f => `File: ${f.path}\nContent:\n${f.content}\n---`).join('\n')}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Extract JSON from the response (sometimes Gemini wraps it in ```json ... ```)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        throw new Error("Failed to parse AI response into JSON.");
    } catch (error) {
        console.error('Error in AI Analysis:', error.message);
        throw new Error('AI Analysis failed: ' + error.message);
    }
};

module.exports = { analyzeDevOps };
