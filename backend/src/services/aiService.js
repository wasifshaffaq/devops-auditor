const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeDevOps = async (files, onLog = () => {}) => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error('Invalid or missing GEMINI_API_KEY in .env file.');
    }

    const MAX_RETRIES = 5;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            if (attempt > 1) {
                const backoff = (lastError?.message?.includes('429')) ? 15000 * (attempt - 1) : 3000 * attempt;
                onLog(`Rate limit detected or error occurred. Retry attempt ${attempt}/${MAX_RETRIES} in ${backoff/1000}s...`, 'warn');
                await new Promise(resolve => setTimeout(resolve, backoff));
            }

            onLog(`Preparing context with ${files.length} configuration files (Attempt ${attempt})...`, 'process');
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: { responseMimeType: "application/json" }
            });

            const prompt = `
            You are a Senior DevOps Security Auditor. Analyze these configuration files.
            Identify security vulnerabilities, infrastructure best practices, and provide a summary with a score (1-10).

            IMPORTANT: Your response must be a valid JSON object. Do not include any text before or after the JSON.

            Format your response as a JSON object with the following structure:
            {
                "summary": "overall summary",
                "score": 8,
                "vulnerabilities": [{ "file": "path", "issue": "description", "severity": "high/med/low" }],
                "recommendations": ["list of improvements"],
                "infrastructure": [{ "type": "S3/EC2/Docker", "name": "resource-name", "status": "Brief insight" }]
            }

            Files to analyze:
            ${files.map(f => `File: ${f.path}\nContent:\n${f.content}\n---`).join('\n')}
            `.trim();

            onLog('Sending payload to Gemini 2.5 Flash for deep architectural review...', 'process');
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            onLog('AI analysis complete. Processing results...', 'process');
            // More robust JSON extraction from markdown blocks if they exist
            let jsonString = text;
            const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                jsonString = jsonMatch[1];
            }
            jsonString = jsonString.trim();

            return JSON.parse(jsonString);

        } catch (error) {
            lastError = error;
            console.error(`AI Attempt ${attempt} failed:`, error.message);
            
            // If it's a parse error, don't retry (it's likely a prompt issue)
            if (error instanceof SyntaxError) break;
            
            // Only retry on network-related "fetch failed" or 5xx errors
            if (!error.message.includes('fetch failed') && !error.message.includes('500') && !error.message.includes('503')) {
                break;
            }
        }
    }

    onLog(`AI Audit Failed after ${MAX_RETRIES} attempts.`, 'error');
    throw new Error(`AI Analysis failed: ${lastError.message}`);
};

module.exports = { analyzeDevOps };
