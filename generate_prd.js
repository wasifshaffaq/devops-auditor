const fs = require("fs");
const { 
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, 
  BorderStyle, WidthType, AlignmentType, ShadingType, PageNumber, 
  Header, Footer 
} = require("docx");

const PRIMARY_BLUE = "2E74B5";
const LIGHT_BLUE = "D9E2F3";
const GREY_TEXT = "595959";
const DARK_BG = "1F2937";
const ROW_ALT_GREY = "F2F2F2";

const createHeader = (text) => {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        run: { color: PRIMARY_BLUE, bold: true, size: 32 }
    });
};

const createSubHeader = (text) => {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 150 },
        run: { color: PRIMARY_BLUE, bold: true, size: 28 }
    });
};

const createBullet = (text) => {
    return new Paragraph({
        text: text,
        bullet: { level: 0 },
        spacing: { before: 100, after: 100 },
        run: { size: 24 }
    });
};

const createParagraph = (text) => {
    return new Paragraph({
        text: text,
        spacing: { before: 150, after: 150 },
        run: { size: 24 }
    });
};

const doc = new Document({
    creator: "Gemini CLI",
    title: "DevOps Polyglot Auditor - PRD",
    description: "Product Requirements Document",
    sections: [
        {
            properties: {
                page: {
                    margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 }
                }
            },
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({ text: "DevOps Polyglot Auditor — Product Requirements Document", color: GREY_TEXT, size: 18 })
                            ]
                        })
                    ]
                })
            },
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({ children: [PageNumber.CURRENT], size: 18 })
                            ]
                        })
                    ]
                })
            },
            children: [
                // Title Page Simulation
                new Paragraph({
                    text: "PRODUCT REQUIREMENTS DOCUMENT",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 3000, after: 500 },
                    run: { color: PRIMARY_BLUE, bold: true, size: 40 }
                }),
                new Paragraph({
                    text: "DevOps Polyglot Auditor",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 200, after: 200 },
                    run: { bold: true, size: 60 }
                }),
                new Paragraph({
                    text: "AI-Powered Infrastructure & Code Security Auditor",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 200, after: 2000 },
                    run: { color: GREY_TEXT, size: 30 }
                }),
                new Table({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    alignment: AlignmentType.CENTER,
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                        insideHorizontal: { style: BorderStyle.NONE },
                        insideVertical: { style: BorderStyle.NONE }
                    },
                    rows: [
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Version", alignment: AlignmentType.RIGHT, run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: " 1.0", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Date", alignment: AlignmentType.RIGHT, run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: " May 13, 2026", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Owner", alignment: AlignmentType.RIGHT, run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: " Wasif Shaffaq", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Repo", alignment: AlignmentType.RIGHT, run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: " wasifshaffaq/devops-polyglot-auditor", run: { color: PRIMARY_BLUE, size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Status", alignment: AlignmentType.RIGHT, run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: " Active Development", run: { color: "00B050", bold: true, size: 24 }})] })
                        ]})
                    ]
                }),
                new Paragraph({
                    text: "Confidential — Internal Use Only",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 3000 },
                    run: { color: GREY_TEXT, size: 20 }
                }),
                new Paragraph({ text: "", pageBreakBefore: true }), // PAGE BREAK

                createHeader("Contents"),
                createParagraph("1 Product Overview"),
                createParagraph("2 Objectives and Goals"),
                createParagraph("3 Target Users"),
                createParagraph("4 Actual Problem Statement"),
                createParagraph("5 Proposed Solution"),
                createParagraph("6 Features"),
                createParagraph("7 Use Flow"),
                createParagraph("8 Functional Requirements"),
                createParagraph("9 Non-Functional Requirements"),
                createParagraph("10 Tech Stack"),
                createParagraph("11 Risk Assessment"),
                
                new Paragraph({ text: "", pageBreakBefore: true }), // PAGE BREAK

                createHeader("1. Product Overview"),
                new Paragraph({
                    children: [
                        new TextRun({ text: "One-liner: ", bold: true, size: 24 }),
                        new TextRun({ text: "DevOps Polyglot Auditor is an ultra-aesthetic, AI-powered infrastructure and code security auditor that performs deep architectural analysis on GitHub repositories by merging real-world containerized security scans with advanced AI-driven 'Senior Engineer' reviews.", size: 24 })
                    ],
                    shading: { type: ShadingType.CLEAR, fill: LIGHT_BLUE },
                    spacing: { before: 200, after: 400 },
                }),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                        bottom: { style: BorderStyle.SINGLE, size: 2, color: "000000" }
                    },
                    rows: [
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Field", run: { color: PRIMARY_BLUE, bold: true, size: 24 }})], shading: { fill: ROW_ALT_GREY } }),
                            new TableCell({ children: [new Paragraph({text: "Detail", run: { bold: true, size: 24 }})], shading: { fill: ROW_ALT_GREY } })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Product Name", run: { color: PRIMARY_BLUE, bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "DevOps Polyglot Auditor", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Repository", run: { color: PRIMARY_BLUE, bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "wasifshaffaq/devops-polyglot-auditor", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Owner / Team", run: { color: PRIMARY_BLUE, bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Wasif Shaffaq", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Primary Language", run: { color: PRIMARY_BLUE, bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "TypeScript, JavaScript", run: { size: 24 }})] })
                        ]})
                    ]
                }),
                createSubHeader("Description"),
                createParagraph("DevOps Polyglot Auditor is a full-stack web application designed for comprehensive codebase security and quality assessment. It features a modern, 'Silicon Valley-grade' UI with glassmorphism and bento-grid layouts on the frontend. The backend orchestrates asynchronous analysis, uniquely combining Google Gemini 1.5 Flash for deep architectural code reviews with actual Dockerized Trivy vulnerability scans. This tool brings enterprise-grade DevOps auditing capabilities to developers through a seamless, highly aesthetic interface."),

                createHeader("2. Objectives and Goals"),
                createParagraph("1. Provide Automated Security Audits — Deliver instant, deep insights into infrastructure-as-code and application vulnerabilities."),
                createParagraph("2. Merge AI with Concrete Execution — Combine the heuristic, architectural understanding of LLMs with the deterministic security checks of Trivy container scanning."),
                createParagraph("3. Demonstrate DevOps Transparency — Visually expose the auditing process via a Live Execution Terminal, showing real-time CI/CD-style logs."),
                createParagraph("4. Ensure Environment Resilience — Automatically adapt to runtime constraints, falling back to pure AI 'Cloud Mode' if local Docker execution is unavailable."),
                createParagraph("5. Deliver Professional Exports — Allow users to generate and download polished PDF audit reports and maintain local audit histories."),

                createHeader("3. Target Users"),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "User Persona", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Type", run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Description", run: { bold: true, size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "DevOps Engineer", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Primary", run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Automating repo health checks across microservices.", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Security Auditor", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Primary", run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Reviewing code for CVEs and misconfigurations.", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Software Developer", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Secondary", run: { color: GREY_TEXT, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Validating infrastructure configurations before merging.", run: { size: 24 }})] })
                        ]})
                    ]
                }),

                createHeader("4. Actual Problem Statement"),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Core Problem: ", bold: true, size: 24 }),
                        new TextRun({ text: "Traditional security scanners are often noisy and lack architectural context, while pure AI reviewers miss concrete dependency vulnerabilities. Existing tools lack a visually engaging, easy-to-deploy middle ground.", size: 24 })
                    ],
                    shading: { type: ShadingType.CLEAR, fill: LIGHT_BLUE },
                    spacing: { before: 200, after: 400 },
                }),
                createParagraph("Specific Pain Points:"),
                createParagraph("1. High Noise, Low Context — Scanners flag everything; developers need a 'Senior Engineer' perspective to filter false positives."),
                createParagraph("2. Complex Setup — Enterprise DevOps tools require extensive configuration and licenses."),
                createParagraph("3. Black Box Execution — Users submit code and wait; there is no visibility into the intermediate parsing and scanning steps."),
                createParagraph("4. Poor UI/UX — Security tools typically have archaic, purely utilitarian interfaces."),

                createHeader("5. Proposed Solution"),
                createParagraph("DevOps Polyglot Auditor resolves these issues through a high-performance, asynchronous pipeline:"),
                createParagraph("Layer 1 — Visually Striking Frontend: React 19 + Tailwind CSS powers a Bento Grid layout, providing real-time log feedback and polished results visualization."),
                createParagraph("Layer 2 — Orchestration Engine: An Express Node.js backend clones repositories and orchestrates parallel child processes for analysis."),
                createParagraph("Layer 3 — Hybrid Analysis Core: Integrates Gemini 1.5 Flash for contextual architecture reviews and Dockerized Trivy for CVE identification, merging both into a definitive JSON report."),

                createHeader("6. Features"),
                createSubHeader("6.1 F1 — AI-Driven Security Analysis"),
                createBullet("Deep codebase architectural reviews utilizing Google Gemini 1.5 Flash."),
                createBullet("Context-aware identification of anti-patterns and infrastructure misconfigurations."),
                createBullet("Enforced JSON output schema for deterministic frontend rendering."),
                createSubHeader("6.2 F2 — Real-World Container Scanning"),
                createBullet("Docker sandbox integration to securely run Trivy."),
                createBullet("Automated dependency and Dockerfile vulnerability checks."),
                createSubHeader("6.3 F3 — Live Execution Terminal"),
                createBullet("Real-time logging component streaming backend processing steps."),
                createBullet("Mirrors CI/CD pipeline aesthetics for user engagement."),
                createSubHeader("6.4 F4 — Smart Environment Adaptation"),
                createBullet("Auto-detection of Docker availability."),
                createBullet("Seamless fallback to 'Cloud Mode' (AI-only) for serverless deployments (Vercel/Render)."),
                createSubHeader("6.5 F5 — Professional Reporting & History"),
                createBullet("Client-side jsPDF generation for instant audit report downloads."),
                createBullet("LocalStorage-based retention of the last 5 repository audits."),

                createHeader("7. Use Flow"),
                createSubHeader("7.1 Primary Flow — Comprehensive Audit"),
                createParagraph("1. Submit — User inputs a GitHub repository URL into the frontend."),
                createParagraph("2. Clone & Analyze — Backend clones the repo via Simple-Git and categorizes files."),
                createParagraph("3. Hybrid Scan — Backend executes Gemini API calls and Trivy Docker scans concurrently."),
                createParagraph("4. Live Monitoring — User watches the Live Execution Terminal detailing progress."),
                createParagraph("5. Render — Data is merged and presented dynamically in the Bento Grid UI."),
                createParagraph("6. Export — User downloads the generated PDF report."),

                createHeader("8. Functional Requirements"),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "ID", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Feature", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Requirement", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Priority", run: { bold: true, size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "FR-01", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Repo Cloning", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "System shall securely clone public GitHub repositories.", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "High", run: { color: "FF0000", size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "FR-02", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "AI Integration", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "System shall query Gemini API with codebase context.", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "High", run: { color: "FF0000", size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "FR-03", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Trivy Scan", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "System shall execute Trivy via Docker if available.", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "High", run: { color: "FF0000", size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "FR-04", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Live Logs", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "System shall stream execution status to the UI.", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Medium", run: { color: "D9A300", size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "FR-05", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "PDF Export", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "System shall generate a structured PDF of findings.", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Medium", run: { color: "D9A300", size: 24 }})] })
                        ]})
                    ]
                }),

                createHeader("9. Non-Functional Requirements"),
                createSubHeader("9.1 Performance"),
                createBullet("Asynchronous processing to prevent server blocking during heavy AI/Docker operations."),
                createBullet("Frontend must load in < 2 seconds leveraging Vite's optimizations."),
                createSubHeader("9.2 Security"),
                createBullet("Gemini API keys must be stored securely in environment variables."),
                createBullet("Cloned repositories must be isolated and aggressively purged post-analysis."),
                createSubHeader("9.3 Usability"),
                createBullet("Aesthetic UI utilizing Glassmorphism and animations for high user retention."),

                createHeader("10. Tech Stack"),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Layer", run: { color: PRIMARY_BLUE, bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Technology", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Purpose", run: { bold: true, size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Frontend Framework", run: { color: PRIMARY_BLUE, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "React 19 + Vite", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "SPA with fast HMR", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Styling", run: { color: PRIMARY_BLUE, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Tailwind CSS v3", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Utility-first design, Bento Grid", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Backend Runtime", run: { color: PRIMARY_BLUE, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Node.js", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Server orchestration", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "Backend Framework", run: { color: PRIMARY_BLUE, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Express.js", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "HTTP routing", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "AI Engine", run: { color: PRIMARY_BLUE, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Gemini 1.5 Flash", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Architectural context analysis", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "DevOps Tools", run: { color: PRIMARY_BLUE, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Docker, Trivy", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Container vulnerability scanning", run: { size: 24 }})] })
                        ]})
                    ]
                }),

                createHeader("11. Risk Assessment"),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "#", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Risk", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Likelihood", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Impact", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Severity", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Mitigation", run: { bold: true, size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "R1", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "AI Hallucinations", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Medium", run: { color: "D9A300", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "High", run: { color: "FF0000", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "High", run: { color: "FF0000", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Enforce JSON output mode and system prompt constraints.", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "R2", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Docker Missing in Prod", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "High", run: { color: "FF0000", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Medium", run: { color: "D9A300", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Medium", run: { color: "D9A300", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Implement Cloud Mode fallback (AI only).", run: { size: 24 }})] })
                        ]}),
                        new TableRow({ children: [
                            new TableCell({ children: [new Paragraph({text: "R3", run: { bold: true, size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Large Repo Timeout", run: { size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Low", run: { color: "00B050", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Medium", run: { color: "D9A300", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Medium", run: { color: "D9A300", size: 24 }})] }),
                            new TableCell({ children: [new Paragraph({text: "Limit clone depth and filter non-essential files.", run: { size: 24 }})] })
                        ]})
                    ]
                })
            ]
        }
    ]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("DevOps_Polyglot_Auditor_PRD.docx", buffer);
    console.log("Document created successfully as DevOps_Polyglot_Auditor_PRD.docx");
});
