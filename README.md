# AI Resume & Career Assistant 🚀

A complete, production-ready full-stack web application designed to act as your AI-powered career coach. Upload a PDF resume or paste text, and instantly get structured, actionable feedback analyzed via the power of Groq (Llama-3-70B). 

## 🌟 Features
- **Instant AI Analysis**: Utilizes Groq `llama3-70b-8192` for blazingly fast insights.
- **Smart PDF Parsing**: Directly upload your `.pdf` resumes for offline-to-online analysis.
- **Comprehensive Dashboard**: View actionable insights, resume score, missing skill gap charts, and ATS tips.
- **12-Week Custom Roadmap**: An auto-generated week-by-week timeline pointing you toward your next top job match.
- **History Tracking**: Automatically keeps track of your latest 10 uploads (MongoDB backed).
- **Beautiful UI**: Dark/Light mode, Recharts visual data, animations, and Tailwind styling (fully mobile responsive).
- **PDF Export**: Print or save your dashboard natively using custom `@media print` CSS.

---

## 🛠 Prerequisites
- Node.js (v18+)
- MongoDB running locally on `port 27017`
- A free Groq API key from [Groq Console](https://console.groq.com/keys)

---

## 🚀 Setup Instructions

### 1. Download/Clone the repository
Ensure you are at the root level of `resume-career-assistant/`.

### 2. Backend Setup
1. CD into the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Groq API Key in `backend/.env`. (Already scaffolded, simply replace the `GROQ_API_KEY` placeholder if needed).
    - Note on `.env`: `PORT` controls the Express server port, `MONGODB_URI` sets local DB, `GROQ_MODEL` explicitly invokes the preferred model structure.
4. Start the backend:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and CD into the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Check `frontend/.env` to ensure `VITE_API_BASE_URL` points to `http://localhost:5000/api`.
4. Start Vite:
   ```bash
   npm run dev
   ```

### 4. Running the App
- Wait for the React app to compile, usually fast on Vite.
- Head to `http://localhost:5173` in your browser.
- Enjoy your premium AI Resume Coach!
