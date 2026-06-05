# Kamil | Backend API 🛡️

This is the repository for the **backend service** of my bachelor's thesis at **Erasmushogeschool Brussel** (Multimedia & Creative Technologies).

**Kamil** is a digital kameleon designed to increase digital resilience. This backend provides the necessary infrastructure for URL analysis, domain age verification, and global statistics tracking to support the Kamil ecosystem.

---

## 🚀 Project Overview
- **Developer:** Arno Baeck
- **Contact:** arno.baeck@student.ehb.be / arno.baeck@live.be
- **Tech Stack:** Node.js, Express, MongoDB (Mongoose), TensorFlow.js
- **Status:** Under Development

## ✨ Key Features
- **URL Analysis Engine:** Evaluates safety indicators like DNS records and domain registration metadata.
- **WHOIS Data Integration:** Seamlessly fetches real-time domain age and ownership info via external APIs.
- **Global Statistics Sync:** Centralized tracking of total URLs checked and analysis performed across all clients.
- **Scalable Architecture:** RESTful API designed for integration with browser extensions and web frontends.

---

## 🛠 Installation & Development

### Prerequisites
- **Node.js**: v14.0.0 or higher
- **MongoDB**: A running instance (Local or Atlas)
- **WHOIS API Key**: Required from [whoisjson.com](https://www.whoisjson.com/)

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/BACHELORPROEF-Project-Kamil/kamil-backend-rebuild.git
   cd kamil-backend-rebuild
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   WHOIS_API_KEY=your_whoisjson_api_key
   ```

4. **Start the server:**
   ```bash
   # Production mode
   npm start

   # Development mode (with nodemon)
   npm run dev
   ```

---

## 🔌 API Endpoints

### 🔍 URL Check
- **`POST /api/check-url`**
- **Payload:** `{ "url": "https://example.com" }`
- **Function:** Returns safety features including DNS status and domain age scores.

### 📊 Statistics
- **`GET /api/stats`**: Retrieves global counters for analyzed URLs.
- **`POST /api/stats`**: Syncs client-side counters to the global database.
- **Payload:** `{ "urlsChecked": 1, "checksPerformed": 1 }`

---

## 📚 Sources & References

### ⚙️ Frameworks & Core Libraries
* [Express.js](https://expressjs.com/) - Fast, minimalist web framework for Node.js.
* [Mongoose ODM](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.
* [TensorFlow.js](https://www.tensorflow.org/js) - Machine learning library used for potential analysis features.
* [Axios](https://axios-http.com/) - Promise-based HTTP client for external API communication.

### 🛡️ External Data Services
* [WhoisJSON API](https://www.whoisjson.com/) - Primary source for domain age and registration details.
* [Safeonweb.be](https://safeonweb.be/) - Reference for Belgian cybersecurity standards and threat alerts.

### 🤖 AI & Productivity Tools
* [Gemini AI](https://gemini.google.com/) - Utilized for logic optimization and research.
* [Gemini CLI](https://geminicli.com/) - Advanced agentic CLI used for codebase orchestration and automation.
* [GitHub Copilot](https://github.com/copilot) - AI pair programmer for rapid prototyping.
* [Project cleanup](./AI_CHATS/project_cleanup.md) - Documentaton of project cleanup.

### 🏭 Hosting
* [Domain name](https://combell.be) - Domain name provider.
* [Host](https://vercel.com) - Hosting provider.

---

## 📄 License
Copyright (c) 2026 Arno Baeck. All rights reserved.  
This project is developed as part of a Bachelor's thesis at Erasmushogeschool Brussel. Unauthorized copying, distribution, or commercial use is strictly prohibited.
