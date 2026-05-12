# DevOps Polyglot Auditor 🚀

An AI-powered Infrastructure & Code Security Auditor built for modern DevOps engineers. This tool performs deep analysis on GitHub repositories, merging real-world containerized security scans with advanced AI architectural reviews.

## ✨ Features
- **AI-Driven Audits:** Uses Google Gemini 2.5 Flash to perform "Senior Engineer" level code and architecture reviews.
- **Real Security Scanning:** Orchestrates local Docker containers to run `Trivy` scans for CVEs and secret detection.
- **Infrastructure Preview:** Visualizes predicted cloud resources (AWS/Docker/K8s) based on codebase analysis.
- **Live Pipeline Visualization:** Real-time feedback on the auditing process (Fetching -> AI Analysis -> Security Check).
- **Lightweight & $0 Cost:** Optimized to run on mid-range hardware (8GB+ RAM) with zero paid subscriptions.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express, Simple-Git.
- **AI:** Google Gemini 2.5 SDK.
- **DevOps Tools:** Docker, Trivy, LocalStack (Conceptual simulation).

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Docker Desktop** (Required for security scans)
- **Gemini API Key** ([Get it here for free](https://aistudio.google.com/))

### Installation
1. **Clone the project** to your local machine.
2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file and add your GEMINI_API_KEY
   npm run dev
   ```
3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📸 Portfolio Talking Points
- **Asynchronous Orchestration:** Explained how the backend handles parallel execution of AI and Docker processes.
- **Hybrid Security Model:** Discussed the benefits of combining static analysis (Trivy) with semantic analysis (Gemini AI).
- **Hardware Optimization:** Built specifically to be resource-efficient for local development.

---
Built with ❤️ using Gemini CLI.
