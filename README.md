# 🛡️ DevOps Polyglot Auditor 🚀

[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://devops-polyglot-auditor.onrender.com/health)
[![AI](https://img.shields.io/badge/AI-Gemini_2.5_Flash-blue?style=for-the-badge&logo=google-gemini)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An AI-powered Infrastructure & Code Security Auditor. This engine performs deep architectural analysis on GitHub repositories, merging real-world containerized security scans with advanced AI-driven "Senior Engineer" reviews.

[**Backend Health**](https://devops-polyglot-auditor.onrender.com/health)

---

## ⚙️ Core Functionality
The project features a high-performance auditing engine designed for DevOps professionals:

- **💻 Real-Time Orchestration:** An asynchronous pipeline that mirrors professional CI/CD output, showing every step from cloning to AI analysis.
- **🛡️ Hybrid Security Scanning:** Combines deterministic CVE scanning (Trivy) with heuristic architectural reviews (Gemini 2.5 Flash).
- **🚀 Local-First Processing:** Optimized file analysis that reads directly from cloned repositories to bypass GitHub API rate limits.

---

## 🛠️ Technical Architecture

### The "Super-Hybrid" Logic
This engine is a fusion of three major DevOps concepts:

| Concept | Implementation in Polyglot Auditor |
| :--- | :--- |
| **Online Judge** | Uses **Docker Sandboxing** to run `Trivy` scans on submitted code. |
| **CI/CD Simulator** | Features a **Granular Logging Stream** via Server-Sent Events (SSE). |
| **Cloud Manager** | Uses AI to generate an **Infrastructure Preview** (S3, EC2, Docker). |

### The Stack
| Tier | Technology |
| :--- | :--- |
| **Core** | Node.js, Express, Simple-Git, Child Process Orchestration |
| **AI Engine** | Google Gemini 2.5 Flash (JSON Output Mode) |
| **DevOps** | Docker, Trivy Security Scanner, GitHub REST API |

---

## 🧠 Smart Environment Adaptation
The auditor is built with **Production-Grade Resilience**. It detects its environment and adapts its feature set:

```mermaid
graph TD
    A[Repository Submitted] --> B{Environment?}
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

---

## 📸 Portfolio Highlights
- **Asynchronous Orchestration:** Handles parallel execution of AI logic and Docker processes without blocking.
- **Logic Prioritization:** Custom file-depth sorting ensures the AI focuses on root configurations (`package.json`, `Dockerfile`) first.
- **Zero-Budget Deployment:** Engineered to run on free-tier cloud infrastructure through intelligent feature fallbacks.
- **Resilient AI Pipeline:** Built-in retry logic with exponential backoff for handling transient API network failures.

---
Developed by **Wasif Shaffaq** | *DevOps & AI Enthusiast*
