# Validation Engine

## Overview

The Validation Engine is the core component of Veris. It is responsible for analyzing a company's website and evaluating multiple trust indicators to determine its legitimacy.

Instead of relying on a single verification source, the engine combines several independent validation checks to generate a comprehensive Trust Score and Risk Level.

The validation process follows a modular architecture, allowing each validation check to operate independently while contributing to the final assessment. This design makes the system easier to maintain, extend, and scale as new validation modules are introduced.

---

## Objectives

The Validation Engine is designed to:

- Verify the authenticity of company websites.
- Analyze multiple trust indicators.
- Generate a transparent Trust Score.
- Classify companies into different Risk Levels.
- Cache validation results to improve performance.
- Support future validation modules without changing the overall architecture.
---

# Validation Pipeline

Every validation request follows the same processing pipeline to ensure consistent and reliable results.

```text
User
 │
 ▼
Submit Website URL
 │
 ▼
Normalize Website URL
 │
 ▼
Extract Hostname
 │
 ▼
Check Existing Validation
 │
 ├────────────► Cached Result Found
 │                    │
 │                    ▼
 │             Return Cached Response
 │
 ▼
Run Validation Modules
 │
 ├── WHOIS Validation
 ├── SSL Validation
 ├── Website Availability
 ├── Contact Detection
 ├── Social Media Detection
 └── Legal Pages Detection
 │
 ▼
Calculate Trust Score
 │
 ▼
Determine Risk Level
 │
 ▼
Generate Validation Summary
 │
 ▼
Store Validation Result
 │
 ▼
Return Response
```

## Pipeline Explanation

When a user submits a website URL, the backend first normalizes the input and extracts the hostname. The system then checks whether a recent validation result already exists.

If a valid cached result is available and a force refresh has not been requested, the cached validation is returned immediately.

Otherwise, the Validation Engine executes all validation modules. The collected results are passed to the Trust Score Engine, which calculates the overall Trust Score and determines the corresponding Risk Level.

Finally, the validation report is stored in the database and returned to the frontend.
---

# Validation Modules

The Validation Engine is composed of multiple independent modules. Each module analyzes a specific aspect of a company's website and contributes to the final Trust Score.

---

## 1. URL Normalization

Before starting the validation process, the submitted website URL is normalized into a consistent format.

This step ensures that different representations of the same website are processed correctly.

### Responsibilities

- Remove unnecessary whitespace
- Add the protocol if missing (`https://`)
- Convert the hostname to lowercase
- Extract the hostname
- Validate URL format

---

## 2. Cache Manager

To improve performance and reduce unnecessary external API requests, Veris checks whether a recent validation already exists.

### Responsibilities

- Search for existing validation records
- Return cached results if they are less than 24 hours old
- Bypass cache when `force=true` is specified

---

## 3. WHOIS Validation

The WHOIS module retrieves public domain registration information.

### Checks Performed

- Domain registration status
- Domain age
- Registrar information
- Domain expiration date

---

## 4. SSL Validation

The SSL module verifies whether the website uses a valid SSL certificate.

### Checks Performed

- SSL certificate availability
- Certificate validity
- Expiration status
- Encryption strength
- Certificate issuer

---

## 5. Website Availability

This module checks whether the website is accessible.

### Checks Performed

- Website responds successfully
- HTTP status validation
- Connection availability

---

## 6. Contact Information Detection

The website is analyzed to identify publicly available contact information.

### Checks Performed

- Email address
- Phone number
- Physical address

---

## 7. Social Media Detection

The homepage is scanned for official social media profiles.

### Checks Performed

- LinkedIn
- Facebook
- Instagram
- X (Twitter)
- YouTube

---

## 8. Legal Pages Detection

The engine verifies whether important legal pages are available.

### Checks Performed

- Privacy Policy
- Terms and Conditions
- About Us
- Contact Us
