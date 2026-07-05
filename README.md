# 🛡️ Veris

### Company Trust & Verification Platform

Veris is a full-stack web application that helps users evaluate the credibility of companies by analyzing multiple trust signals and generating an overall trust score. The platform combines domain analysis, website validation, security checks, and publicly available company information to provide a comprehensive trust assessment.

---

## 🌐 Live Demo

**Frontend:** https://veris-ruby.vercel.app

**Backend API:** https://veris-g3jt.onrender.com

> **Note:** The backend is hosted on Render's free tier. The first request after inactivity may take a few seconds due to cold starts.

---

# ✨ Features

* Secure JWT Authentication
* Company Trust Verification
* Multi-Factor Trust Score
* WHOIS Domain Analysis
* SSL Certificate Validation
* Website Reachability Check
* Contact Information Detection
* Privacy Policy Detection
* Terms & Conditions Detection
* Careers Page Detection
* Social Media Presence Detection
* Search History
* 24-Hour Validation Cache
* Fresh Validation Option
* Responsive UI
* Dark Mode Support

---

# 🏗️ Architecture

```text
                        User
                          │
                          ▼
                React + Vite Frontend
                     (Vercel)
                          │
                    REST API Calls
                          │
                          ▼
                Express.js Backend
                     (Render)
                          │
      ┌───────────────────┼───────────────────┐
      │                   │                   │
      ▼                   ▼                   ▼
 Validation Engine   Trust Score Engine   MongoDB Atlas
      │
      ├── WHOIS
      ├── SSL
      ├── Website
      ├── Contact
      ├── Legal
      ├── Careers
      └── Social
```

---

# ⚙️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Axios
* Cheerio

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# 🔍 Trust Signals

Veris evaluates companies using multiple trust indicators:

| Trust Signal | Purpose                      |
| ------------ | ---------------------------- |
| WHOIS        | Domain registration analysis |
| SSL          | HTTPS certificate validation |
| Website      | Reachability verification    |
| Contact      | Contact page detection       |
| Legal        | Privacy Policy & Terms pages |
| Careers      | Hiring page detection        |
| Social       | Official social presence     |

The final trust score is generated using a weighted rule-based scoring engine.

---

# ⚡ Caching Strategy

To improve performance and reduce repeated validations:

* Validation results are stored in MongoDB.
* Cached results remain valid for **24 hours**.
* Users can request a **Fresh Validation** at any time.

---

# 📂 Project Structure

```text
Compney-Verification-System/
│
├── backend/
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── vercel.json
│   └── package.json
│
├── .env.example
└── README.md
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/Rudra805-cloud/Compney-Verification-System.git
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
WHOIS_API_KEY=your_whois_api_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

---

# 🚀 Future Enhancements

* AI-powered Company Summary
* Company Comparison
* PDF Report Export
* Email Verification
* Redis Caching
* Rate Limiting
* Admin Dashboard

---

# 👨‍💻 Author

**Rudra Mishra**

GitHub: https://github.com/Rudra805-cloud

LinkedIn: https://www.linkedin.com/in/rudra-mishra-315794326/

---

## ⭐ Support

If you found this project interesting or useful, consider giving it a ⭐ on GitHub.
