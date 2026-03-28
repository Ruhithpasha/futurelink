# 🌌 AI Flow Designer (Gen)

A state-of-the-art MERN application that visualizes AI interactions using **React Flow**, powered by the **Google Gemini API**, and persisted with **MongoDB**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dbfb.svg)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-4285f4.svg)
![Database](https://img.shields.io/badge/Database-MongoDB-47a248.svg)

---

## 🚀 Overview

**AI Flow Designer** is a premium designer tool where users can build visual AI workflows. It allows you to enter prompts via interactive, glassmorphic nodes, generate real-time AI responses, and persist those flows for future review. Designed with a **cosmic aesthetic** and high-performance **MERN architecture**.

---

## ⚙️ Local Development Setup

Follow these steps to get the project running on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/ruhithpasha/flow-ai-app.git
cd flow-ai-app
```

### 2. Configure Environment Variables
Create the following `.env` files for local development:

**In `server/.env`**:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

**In `client/.env`**:
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Install Dependencies
From the root directory, run:
```bash
# Install root, client, and server dependencies simultaneously
npm install
cd client && npm install
cd ../server && npm install
```

### 4. Run Locally (Recommended)
Return to the root directory and run:
```bash
npm run dev
```

> [!TIP]
> **Why run from the root?**  
> Running `npm run dev` from the root uses `concurrently` to start both the **Frontend** and **Backend** with one single command. This provides unified logging in your terminal, simplifies process management, and ensures both environments stay in sync during development.

---

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Tailwind CSS v4, React Flow (XYFlow v12), Lucide Icons, React Hot Toast.
-   **Backend**: Node.js, Express, Mongoose (Controller-Service-Repository Pattern).
-   **AI**: Google Generative AI (Gemini SDK).
-   **Database**: MongoDB.

---

## 🤝 Connect With Me

Designed and developed by **Ruhith Pasha**.

-   **Portfolio**: [Visit My Website](https://portfolioruhith.vercel.app)
*   **LinkedIn**: [Let's Network](https://linkedin.com/in/ruhith-pasha-8a3625245)
-   **GitHub**: [Follow my Work](https://github.com/ruhithpasha)

---
*Created for specialized job application showcase - 2026*
