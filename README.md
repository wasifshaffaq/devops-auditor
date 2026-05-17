# 🌑 DevOps Polyglot Auditor v2.5

> **Architectural Intelligence for Modern DevOps.** An AI-powered security orchestrator that merges heuristic reasoning with deterministic container analysis.

[![Gemini 2.5 Flash](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-00A3FF?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/flash/)
[![Trivy Engine](https://img.shields.io/badge/Scanner-Trivy-white?style=for-the-badge&logo=aquasecurity)](https://github.com/aquasecurity/trivy)
[![Theme-Obsidian](https://img.shields.io/badge/Theme-Obsidian%20Dark-020202?style=for-the-badge)](https://github.com/wasifshaffaq/devops-polyglot-auditor)

---

## 💎 The Engineering HUD
The Auditor is presented through a bespoke, high-density **Command Center**. Designed for elite security operations, it features:
- **Neural Archive:** Persistent local storage of previous scans.
- **Live SSE Terminal:** Real-time execution logs with zero-latency streaming.
- **Architectural Bento:** A 12-column grid layout for high-speed signal processing.

---

## 🛠️ Technical Orchestration
Polyglot Auditor doesn't just match patterns; it understands **infrastructure relationships**.

### 1. Volatile Memory Cloning
Bypasses GitHub REST API limits by cloning repositories into temporary container RAM. This ensures **unlimited audit capacity** and deep-file access without rate-limiting hurdles.

### 2. Multi-Layered Extraction
Automatically prioritizes and extracts the top 15 most critical DevOps configuration files across any directory depth:
- `Dockerfile` / `docker-compose.yml`
- `.tf` (Terraform Modules)
- `k8s/*.yaml` (Kubernetes Manifests)
- `Jenkinsfile` / `.github/workflows`
- `package.json` (Dependency Trees)

### 3. Dual-Engine Reasoning
- **Deterministic:** Integrated **Trivy Engine** performs deep container scanning for known CVEs and misconfigurations.
- **Heuristic:** **Gemini 2.5 Flash** performs architectural post-mortems, identifying complex logic traps (e.g., RBAC escalation, IAM privilege chains) that standard scanners miss.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js v20+**
- **Docker** (For Trivy deterministic scanning)
- **Gemini API Key** (Get it at [aistudio.google.com](https://aistudio.google.com/))

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/wasifshaffaq/devops-polyglot-auditor
cd devops-polyglot-auditor

# Setup Environment
echo "GEMINI_API_KEY=your_key_here" > backend/.env

# Install Dependencies
npm run install-all
```

### 3. Execution
```bash
# Start the Backend (Port 5001)
npm run dev --prefix backend

# Start the Landing Page (Port 3000)
npm run dev --prefix landing

# Start the Engineering HUD (Port 5173)
npm run dev --prefix frontend
```

---

## 🏛️ Project Architecture
```text
devops-polyglot-auditor/
├── backend/          # Node.js / Express / Gemini 2.5 / Trivy
├── frontend/         # React / Vite / Tailwind 3 (Engineering HUD)
└── landing/          # Next.js 15 / Framer Motion / Tailwind 4 (Gateway)
```

---

## 🛡️ Security Posture
This tool is built to crack the "tough" repos. It has been stress-tested against:
- **CloudGoat:** Advanced AWS attack scenarios.
- **K8s-Goat:** Complex Kubernetes RBAC chains.
- **WrongSecrets:** Hidden path and logic-based secret exposure.

---

## 👨‍💻 Engineered By
**Wasif Shaffaq**  
*Building Architectural Intelligence for the Cloud.*

---

<p align="center">
  <img src="https://raw.githubusercontent.com/wasifshaffaq/devops-polyglot-auditor/main/frontend/public/favicon.svg" width="60" alt="Logo" />
  <br/>
  <b>Obsidian v2.5 Flash</b>
</p>
