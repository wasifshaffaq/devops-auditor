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

1. **Volatile Memory Cloning:** Bypasses GitHub API limits by cloning repositories into temporary container RAM.
2. **Multi-Layered Extraction:** Automatically prioritizes `Dockerfile`, `.tf`, `k8s/*.yaml`, and `package.json`.
3. **Dual-Engine Reasoning:** Combines **Trivy** (Deterministic CVEs) with **Gemini 2.5 Flash** (Heuristic Logic Traps).

---

## 🚀 Absolute Noob Guide (Step-by-Step Setup)

Welcome! If you've never run a technical project like this before, follow these steps exactly.

### 1. Install the Foundations
You need three pieces of software installed on your computer:
1. **Node.js (v20 or higher):** Download and install the "LTS" version from [nodejs.org](https://nodejs.org/).
2. **Git:** Download and install from [git-scm.com](https://git-scm.com/).
3. **Docker Desktop:** Download and install from [docker.com](https://www.docker.com/products/docker-desktop/). *Make sure Docker is running before you start the audit.*

### 2. Get Your AI Brain (Gemini API Key)
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API Key"** on the left sidebar.
4. Copy your key. **Keep it secret!**

### 3. Clone the Project
Open your computer's **Terminal** (or Command Prompt) and type these commands:
```bash
# Clone the repository
git clone https://github.com/wasifshaffaq/devops-polyglot-auditor
cd devops-polyglot-auditor
```

### 4. Configure the Backend
We need to tell the app your API key:
1. Navigate into the `backend` folder.
2. Create a new file named `.env`.
3. Open `.env` in a text editor and paste this line (replace `your_key_here` with your actual key):
```text
GEMINI_API_KEY=your_key_here
```

### 5. Install Everything
Run this command from the **root directory** (the main `devops-polyglot-auditor` folder):
```bash
# This installs dependencies for the Backend, Landing Page, and HUD all at once
npm install && npm install --prefix backend && npm install --prefix frontend && npm install --prefix landing
```

### 6. Launch the System
You need to open **3 separate terminal windows** to keep all parts of the app running:

*   **Terminal 1 (The Engine):**
    ```bash
    cd backend
    npm start
    ```
*   **Terminal 2 (The Gateway):**
    ```bash
    cd landing
    npm run dev
    ```
*   **Terminal 3 (The Auditor HUD):**
    ```bash
    cd frontend
    npm run dev
    ```

### 7. Start Auditing
1. Open your browser to `http://localhost:3000`.
2. Click **START AUDIT**.
3. Paste a GitHub link (e.g., `https://github.com/bridgecrewio/terragoat`) and hit **RUN ENGINE**.

---

## 🏛️ Project Architecture
```text
devops-polyglot-auditor/
├── backend/          # The Engine (Port 5001)
├── frontend/         # The Engineering HUD (Port 5173)
└── landing/          # The Marketing Gateway (Port 3000)
```

---

## 👨‍💻 Engineered By
**Wasif Shaffaq**  
*Building Architectural Intelligence for the Cloud.*

---

<p align="center">
  <img src="https://raw.githubusercontent.com/wasifshaffaq/devops-polyglot-auditor/master/frontend/public/favicon.svg" width="60" alt="Logo" />
  <br/>
  <b>Obsidian v2.5 Flash</b>
</p>
