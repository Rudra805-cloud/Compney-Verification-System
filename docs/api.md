# API Documentation

## Overview

Veris exposes a RESTful API that enables user authentication, company validation, and retrieval of validation results. The backend is built with Node.js and Express.js and communicates using JSON over HTTP.


## Deployment

| Environment | URL |
|------------|-----|
| Frontend | https://veris-ruby.vercel.app |
| Backend API | https://veris-g3jt.onrender.com/api |
| Local Development | http://localhost:5000/api |

---
# Authentication APIs

---

## 1. Register User

Creates a new user account.

### Endpoint

```http
POST /api/auth/register
```

### Authentication

Not Required

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "<JWT_TOKEN>"
}
```

### Access

Public

---

## 2. Login User

Authenticates an existing user and returns a JWT.

### Endpoint

```http
POST /api/auth/login
```

### Authentication

Not Required

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

### Access

Public

---

## 3. Get User Profile

Returns details of the authenticated user.

### Endpoint

```http
GET /api/auth/profile
```

### Authentication

Required

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Access

Private

---

# Validation API

## Validate Company

Runs the complete company validation pipeline and returns a detailed validation report for the submitted website.

### Endpoint

```http
POST /api/validate
```

### Authentication

Required

```http
Authorization: Bearer <JWT_TOKEN>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| force | Boolean | No | Forces a fresh validation by bypassing the 24-hour cache. |

Example:

```http
POST /api/validate?force=true
```

---

### Request Body

```json
{
  "websiteUrl": "https://openai.com"
}
```

---

### Validation Pipeline

When a validation request is received, Veris performs the following steps:

1. Normalize the submitted website URL.
2. Extract the hostname.
3. Check whether a recent validation exists in the database.
4. Return the cached result if it is less than 24 hours old (unless `force=true`).
5. Perform WHOIS validation.
6. Verify the SSL certificate.
7. Check website accessibility.
8. Detect contact information.
9. Detect legal pages.
10. Detect social media links.
11. Calculate the Trust Score.
12. Determine the Risk Level.
13. Generate a validation summary.
14. Store the validation result in MongoDB.
15. Return the complete validation report.

---

### Success Response

```json
{
  "success": true,
  "data": {
    "hostname": "openai.com",
    "trustScore": 94,
    "riskLevel": "Low",
    "summary": "The website appears to be a legitimate organization.",
    "appliedChecks": {}
  }
}
```

---

### Access

Private

---

# History APIs

The History APIs allow authenticated users to access their previous company validation records.

## Get Validation History

Returns a paginated list of validation history for the authenticated user.

### Endpoint

```http
GET /api/history?page=1&limit=20
```

### Authentication

Required

```http
Authorization: Bearer <JWT_TOKEN>
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | Number | Page number |
| limit | Number | Number of records per page |

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "validationId": "688d2f...",
      "hostname": "openai.com",
      "trustScore": 94,
      "riskLevel": "Low",
      "searchedAt": "2026-07-16T10:30:00Z"
    }
  ]
}
```

### Access

Private

---

## Get Validation Details

Returns the complete validation report for a specific validation.

### Endpoint

```http
GET /api/history/:validationId
```

### Authentication

Required

```http
Authorization: Bearer <JWT_TOKEN>
```

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| validationId | ID of the validation record |

### Success Response

```json
{
  "success": true,
  "data": {
    "hostname": "openai.com",
    "trustScore": 94,
    "riskLevel": "Low",
    "summary": "The website appears to be a legitimate organization.",
    "appliedChecks": {}
  }
}
```

### Access

Private
