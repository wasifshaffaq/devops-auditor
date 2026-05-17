# 🌑 DevOps Polyglot Auditor v2.5

> **Architectural Intelligence for Modern DevOps.** An AI-powered security orchestrator that merges heuristic reasoning with deterministic container analysis.

[![Gemini 2.5 Flash](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-00A3FF?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/flash/)
[![Trivy Engine](https://img.shields.io/badge/Scanner-Trivy-white?style=for-the-badge&logo=aquasecurity)](https://github.com/aquasecurity/trivy)
[![Theme-Obsidian](https://img.shields.io/badge/Theme-Obsidian%20Dark-020202?style=for-the-badge)](https://github.com/wasifshaffaq/devops-auditor)

---

## 💎 The Engineering HUD
The Auditor is presented through a bespoke, high-density **Command Center**. Designed for elite security operations, it features:
- **Neural Archive:** Persistent local storage of previous scans.
- **Live SSE Terminal:** Real-time execution logs with zero-latency streaming.
- **Architectural Bento:** A 12-column grid layout for high-speed signal processing.

---

## ☁️ Cloud Ready (V2.5 Transformation)
The Polyglot Auditor is now fully **Containerized** and **Cloud-Compatible**.
- **Universal Backend:** Bundled with Node.js and the **Trivy binary** via Docker.
- **Render Ready:** Includes `render.yaml` for one-click orchestration.
- **Vercel/Netlify Ready:** Frontend and Landing Page are optimized for static and edge deployment.

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
You need these pieces of software installed on your computer:
1. **Node.js (v20 or higher):** Download and install from [nodejs.org](https://nodejs.org/).
2. **Git:** Download and install from [git-scm.com](https://git-scm.com/).
3. **Docker Desktop:** Required for *local* deterministic scans. Download from [docker.com](https://www.docker.com/products/docker-desktop/).

### 2. Get Your AI Brain (Gemini API Key)
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **"Get API Key"** and copy it.

### 3. Clone the Project
Open your computer's **Terminal** and type:
```bash
git clone https://github.com/wasifshaffaq/devops-auditor
cd devops-auditor
```

### 4. Configure & Install
1. In the `backend` folder, create a file named `.env` and add: `GEMINI_API_KEY=your_key_here`.
2. In the main folder, run:
```bash
npm install && npm install --prefix backend && npm install --prefix frontend && npm install --prefix landing
```

### 5. Launch the System (3 Terminal Windows)
- **Terminal 1:** `cd backend && npm start`
- **Terminal 2:** `cd landing && npm run dev`
- **Terminal 3:** `cd frontend && npm run dev`

---

## 🌐 Cloud Deployment (Render One-Click)
To host this permanently in the cloud:
1. Push this code to your own GitHub repository.
2. Connect your repository to **Render.com**.
3. Render will automatically detect the `render.yaml` file and set up:
   - **Backend:** As a Docker Web Service.
   - **Landing Page:** As a Node.js Service.
   - **HUD:** As a Static Site.
4. **Crucial:** Add your `GEMINI_API_KEY` in the Render dashboard for the `auditor-engine` service.

---

## 👨‍💻 Engineered By
**Wasif Shaffaq**  
*Building Architectural Intelligence for the Cloud.*

---

<p align="center">
  <img src="https://raw.githubusercontent.com/wasifshaffaq/devops-auditor/master/frontend/public/favicon.svg" width="60" alt="Logo" />
  <br/>
  <b>Obsidian v2.5 Flash</b>
</p>
