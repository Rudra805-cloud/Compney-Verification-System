# Veris System Architecture

## Overview

Veris is a full-stack web application designed to help users evaluate the trustworthiness of companies. The system analyzes multiple validation signals—including domain information, SSL certificates, website accessibility, contact details, legal pages, and social media presence—to generate a Trust Score and Risk Level.

The application follows a client-server architecture, where a React frontend communicates with a Node.js and Express backend through REST APIs. The backend coordinates validation services, processes data from external APIs, stores results in MongoDB, and returns a structured validation report to the frontend.

## Architecture Goals

- Modular and maintainable codebase
- Secure authentication using JWT
- Fast response through validation caching
- Easy integration of new validation checks
- Scalable service-oriented backend
- Clear separation between frontend, backend, and database
 
## High-Level Architecture

```
                 +----------------------+
                 |      User Browser    |
                 +----------+-----------+
                            |
                            | HTTP Requests
                            v
                 +----------------------+
                 |   React Frontend     |
                 |  (Vite + Tailwind)   |
                 +----------+-----------+
                            |
                            | REST API
                            v
                 +----------------------+
                 | Express.js Backend   |
                 +----------+-----------+
                            |
          +-----------------+------------------+
          |                 |                  |
          v                 v                  v
   WHOIS Service      SSL Service      Website Analysis
                                              |
                                              v
                                      Cheerio Scraper
                                              |
                                              v
                                       Validation Logic
                                              |
                                              v
                                        MongoDB Atlas
```

## Components

### React Frontend

The frontend provides the user interface where users can search for companies, authenticate, and view validation results. It communicates with the backend through REST APIs.

### Express Backend

The backend handles API requests, authentication, validation workflows, caching, and communication with external services.

### Validation Services

The validation layer performs independent checks such as:

- Domain (WHOIS) validation
- SSL certificate validation
- Website availability
- Contact information detection
- Legal page detection
- Social media detection

Each validation module returns structured results that are combined to generate the final Trust Score.

### MongoDB

MongoDB stores:

- User accounts
- Company records
- Validation results
- Search history
- Cached validation data

## Request Flow

The following sequence describes how Veris processes a company validation request:

1. The user enters a company domain or website URL.
2. The React frontend sends a validation request to the Express backend.
3. The backend normalizes the input URL.
4. The backend checks whether a recent validation result exists in the database.
5. If a cached result is available (within 24 hours), it is returned immediately.
6. Otherwise, the backend executes all validation services.
7. The validation results are combined and passed to the Trust Score engine.
8. A Trust Score and Risk Level are generated.
9. The validation report is stored in MongoDB.
10. The complete response is returned to the frontend and displayed to the user.

## Request Flow Diagram

```
User
  │
  ▼
React Frontend
  │
  ▼
Express API
  │
  ▼
Normalize URL
  │
  ▼
Check Cache
  │
  ├──────────────► Cache Found
  │                   │
  │                   ▼
  │             Return Result
  │
  ▼
Run Validation Services
  │
  ├── WHOIS Check
  ├── SSL Check
  ├── Website Check
  ├── Contact Detection
  ├── Social Detection
  └── Legal Pages Detection
          │
          ▼
Calculate Trust Score
          │
          ▼
Store in MongoDB
          │
          ▼
Return Response to Frontend
```