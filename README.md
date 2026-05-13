# 🛡️ DevOps Polyglot Auditor 🚀

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://devops-polyglot-auditor.vercel.app/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://devops-polyglot-auditor.onrender.com/health)
[![AI](https://img.shields.io/badge/AI-Gemini_2.5_Flash-blue?style=for-the-badge&logo=google-gemini)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An **Ultra-Aesthetic**, AI-powered Infrastructure & Code Security Auditor. This tool performs deep architectural analysis on GitHub repositories, merging real-world containerized security scans with advanced AI-driven "Senior Engineer" reviews.

[**Live Demo**](https://devops-polyglot-auditor.vercel.app/) • [**Backend Health**](https://devops-polyglot-auditor.onrender.com/health)

---

## 💎 Ultra-Aesthetics Overhaul
The project features a **Silicon Valley-grade UI** designed for maximum visual impact and professional clarity:
- **Glassmorphism:** Frosted glass components with `backdrop-blur` and dynamic borders.
- **Bento Grid:** Apple-inspired asymmetric layout for structured data visualization.
- **Animated Environment:** Interactive background blobs and a technical grid overlay.
- **Dual-Mode HUD:** Seamless Light/Dark mode transitions with persistent user preferences.

---

## 🛠️ Technical Architecture

### The "Super-Hybrid" Logic
This tool is a fusion of three major DevOps concepts:

| Concept | Implementation in Polyglot Auditor |
| :--- | :--- |
| **Online Judge** | Uses **Docker Sandboxing** to run `Trivy` scans on submitted code. |
| **CI/CD Simulator** | Features a **Visual Pipeline HUD** (Fetching → AI Logic → Security). |
| **Cloud Manager** | Uses AI to generate an **Infrastructure Preview** (S3, EC2, Docker). |

### The Stack
| Tier | Technology |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS v3, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express, Simple-Git, Child Process Orchestration |
| **AI Engine** | Google Gemini 2.5 Flash (JSON Output Mode) |
| **DevOps** | Docker, Trivy Security Scanner, GitHub REST API |

---

## 🧠 Smart Environment Adaptation
The auditor is built with **Production-Grade Resilience**. It detects its environment and adapts its feature set:

```mermaid
graph TD
    A[User Submits Repo] --> B{Environment?}
    B -- "Local (Docker Present)" --> C[Full Orchestration: AI + Real Trivy Scan]
    B -- "Cloud (No Docker)" --> D[Cloud Mode: Deep AI Security Analysis]
    C --> E[Merged Final Report]
    D --> E[Merged Final Report]
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Docker Desktop** (Optional, required for real container scans)
- **Gemini API Key** ([Get it free](https://aistudio.google.com/))

### Quick Install
1. **Clone the Repo:**
   ```bash
   git clone https://github.com/wasifshaffaq/devops-polyglot-auditor.git
   ```
2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Add GEMINI_API_KEY to .env
   npm run dev
   ```
3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 📸 Portfolio Highlights
- **Asynchronous Orchestration:** Handles parallel execution of AI logic and Docker processes without blocking.
- **Logic Prioritization:** Custom file-depth sorting ensures the AI focuses on root configurations (`package.json`, `Dockerfile`) first.
- **Zero-Budget Deployment:** Engineered to run on free-tier cloud infrastructure through intelligent feature fallbacks.

---
Developed by **Wasif Shaffaq** | *DevOps & AI Enthusiast*
