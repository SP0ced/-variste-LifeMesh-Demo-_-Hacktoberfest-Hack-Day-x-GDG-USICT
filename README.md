# 🫀 LifeMesh: The Zero-Knowledge Medical Logistics Protocol
### Powered by Google DeepMind Gemma 4 Multimodal Clinical AI & DigitalOcean

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-ff7a59.svg)](https://hacktoberfest.com/)
[![Track A: Google DeepMind Gemma 4](https://img.shields.io/badge/Track%20A-Google%20DeepMind%20Gemma%204-4285F4.svg)](https://ai.google.dev/gemma)
[![Track B: DigitalOcean Open-Source](https://img.shields.io/badge/Track%20B-DigitalOcean%20Open--Source-0080FF.svg)](https://www.digitalocean.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB.svg)](https://react.dev/)

> **Submission for Hacktoberfest Hack Day x Google Developer Groups on Campus USICT**  
> **Sanctioned by Major League Hacking (MLH)**  
> **Team:** Évariste (Indraprastha Institute of Information Technology Delhi - IIITD)

---

## 📌 Executive Summary

Every year, over **37% of harvested donor organs are discarded** due to slow manual clinical triage, strict cross-border privacy boundaries (HIPAA/GDPR preventing national registry sharing), and undetected cold-chain failures in transit.

**LifeMesh** solves this crisis with a 3-pillar protocol:
1. **Google DeepMind Gemma 4 Multimodal AI Triage:** Sub-400ms clinical perception of graft viability, micro-vascular cortical blush, capsular integrity, and OCR extraction of handwritten surgical cold-ischemia logs with multilingual vernacular dispatches.
2. **Zero-Knowledge SMPC Matching:** Secure Multi-Party Computation (3-of-5 Shamir scheme) computing recipient-donor HLA compatibility across sovereign hospital networks without exposing raw patient bio-data.
3. **Autonomous IoT Cold-Chain & Tamper-Evident Enclosure:** Edge sensory telematics (ESP32 / Arduino Nano 33 BLE) streaming 1Hz temperature, humidity, shock, and GPS telemetry, triggering dynamic rerouting and physical container locking until authorized destination PIN verification.

---

## 🌟 Hackathon Sponsor Track Implementations

### Track A: Best Use of Gemma 4 (Google DeepMind)
* **Multimodal Clinical Vision:** Evaluates high-resolution donor organ specimens (kidneys, livers, hearts, lungs) across cortical perfusion and capsular integrity parameters.
* **Clinical OCR Extraction:** Extracts handwritten donor surgical logs, cross-clamp timestamps, and preservation fluid types (UW solution, HTK, Celsior).
* **Vernacular Dispatcher:** Synthesizes emergency ground transit dispatches in regional Indian languages (Hindi, Bengali, Tamil, English) for tarmac drivers and medical couriers.
* **Dual Execution Mode:** Live inference via Google GenAI (`google-genai` / `models/gemma-4-it`) with an offline edge physiological simulation fallback guaranteeing 100% demo uptime.
* **Code Location:** `backend/gemma_triage.py` and `frontend/src/pages/hospital/GemmaTriage.jsx`.

### Track B: Best Open-Source AI Project (DigitalOcean)
* **100% Open Source:** Licensed under the permissive MIT license.
* **Cloud-Ready Containerization:** Production `Dockerfile` and `docker-compose.yml` pre-configured for automated continuous deployment to **DigitalOcean App Platform**.
* **Microservices Architecture:** Stateless FastAPI ASGI application, PostgreSQL managed database support, and static asset storage via DigitalOcean Spaces.

---

## 🏗️ Architecture Overview

```
                               ┌───────────────────────────┐
                               │ Google DeepMind Gemma 4   │
                               │ Multimodal Clinical Model │
                               └─────────────┬─────────────┘
                                             │ Vision + OCR
┌───────────────────────────────┐            ▼            ┌───────────────────────────────┐
│     HOSPITAL PORTAL           │   POST /api/gemma/triage│     LOGISTICS PORTAL          │
│ • Donor Graft Registration    ├────────────────────────►│ • 3D Mapbox Telemetry Routing │
│ • HLA Commitment Generation   │                         │ • Real-time Cold Chain Graphs │
│ • Biometric Container Arming  │◄────────────────────────┤ • Tamper Breach Alerts        │
└───────────────┬───────────────┘       WebSocket (1Hz)   └───────────────┬───────────────┘
                │                                                         │
                ▼                                                         ▼
    ┌───────────────────────┐                                 ┌───────────────────────┐
    │  SMPC Matching Engine │                                 │ Physical IoT Hardware │
    │ (3-of-5 Shamir Secret)│                                 │ (ESP32 + OLED + GSM)  │
    └───────────────────────┘                                 └───────────────────────┘
```

---

## 🚀 Quickstart & Local Installation

### Prerequisites
* Python 3.11+ (or Python 3.14)
* Node.js v18+ & npm

### 1. Clone Repository
```bash
git clone https://github.com/SP0ced/-variste-LifeMesh-Demo-_-Hacktoberfest-Hack-Day-x-GDG-USICT.git
cd -variste-LifeMesh-Demo-_-Hacktoberfest-Hack-Day-x-GDG-USICT
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
*API Documentation will be live at `http://localhost:8000/docs`.*

### 3. Frontend Setup (React 19 + Vite)
```bash
cd ../frontend
npm install
npm run dev
```
*Application interface will be live at `http://localhost:5173`.*

---

## 👥 Team Évariste
* **Varun Kumar** — *Team Leader* (Atma Ram Sanatan Dharma College, University of Delhi | GitHub: [@varunkm26](https://github.com/varunkm26) | `varunmahatovlogs@gmail.com`)
* **Khushan Singh** — *Core Systems & Multimodal AI* (IIIT Delhi | GitHub: [@SP0ced](https://github.com/SP0ced) | `khushansinghiiitd@gmail.com`)
* **Palak** — *Research & Frontend Engineering* (IIIT Delhi | GitHub: [@palak2804](https://github.com/palak2804) | `palakiiitd@gmail.com`)

---

## 📜 License
Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
