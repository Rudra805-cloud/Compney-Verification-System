# Deployment Guide

## Overview

Veris is deployed using a modern cloud-based architecture that separates the frontend, backend, and database into independent services. This approach improves scalability, simplifies maintenance, and allows each component to be updated independently.

---

## Deployment Architecture

| Component | Technology | Platform |
|-----------|------------|----------|
| Frontend | React + Vite | Vercel |
| Backend | Node.js + Express | Render |
| Database | MongoDB Atlas | MongoDB Atlas |

---

## Production Deployment

### Frontend

```text
https://veris-ruby.vercel.app
```

### Backend API

```text
https://veris-g3jt.onrender.com/api
```

### Local Development

```text
Frontend
http://localhost:5173

Backend
http://localhost:5000/api
```

---

# Environment Variables

The backend requires the following environment variables before running the application.

| Variable | Description |
|----------|-------------|
| PORT | Server port |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key used to sign JWT tokens |
| WHOIS_API_KEY | API key for WHOIS service |

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
WHOIS_API_KEY=your_api_key
```
---

# Deployment Workflow

The deployment process for Veris is as follows:

1. Push the latest source code to GitHub.
2. Vercel automatically builds and deploys the React frontend.
3. Render automatically builds and deploys the Express backend.
4. The backend connects securely to MongoDB Atlas.
5. The frontend communicates with the deployed backend through REST APIs.
6. Users access the application through the deployed frontend.

```text
Developer
     │
     ▼
 GitHub Repository
     │
     ├──────────────► Vercel (Frontend)
     │
     └──────────────► Render (Backend)
                            │
                            ▼
                     MongoDB Atlas
```

