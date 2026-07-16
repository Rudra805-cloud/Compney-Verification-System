# Validation Result Structure

## Overview

This document explains the structure of the validation result returned by the backend after a company website has been analyzed.

It complements the Validation Engine and Trust Score documentation by showing how the final data is organized for API consumers and the frontend UI.

The validation result combines three things:

- The normalized company identity data.
- The detailed check results from each validation module.
- The final scoring output used to determine trustworthiness and risk.

---

# Result Flow

The validation service performs the following steps before returning a response:

1. Normalize the submitted website URL.
2. Extract the hostname.
3. Run all validation checks.
4. Calculate the Trust Score.
5. Determine the Risk Level.
6. Generate a human-readable summary.
7. Return the structured validation result.

---

# Response Shape

A successful validation response typically contains the following top-level fields:

| Field | Type | Description |
|-------|------|-------------|
| hostname | String | Normalized hostname extracted from the submitted URL. |
| websiteUrl | String | The normalized website URL used during validation. |
| checks | Object | Raw output from each validation module. |
| trustScore | Object | Final scoring output, including score, confidence, and section breakdown. |
| riskLevel | String | Risk classification derived from the Trust Score. |
| summary | String | Human-readable explanation of the result. |
| lastValidatedAt | Date | Timestamp for when validation was completed. |

---

# Example Response

```json
{
  "hostname": "openai.com",
  "websiteUrl": "https://openai.com",
  "checks": {
    "whois": {},
    "ssl": {},
    "websiteReach": {},
    "contactInfo": {},
    "socialPresence": {},
    "legalpages": {},
    "careersInfo": {}
  },
  "trustScore": {
    "score": 94,
    "confidence": 92,
    "breakdownScore": {
      "whoisScore": 98,
      "sslScore": 96,
      "websiteReachScore": 100,
      "contactScore": 88,
      "socialScore": 75,
      "legalScore": 80,
      "careerScore": 60
    }
  },
  "riskLevel": "Low",
  "summary": "The company (openai.com) received a Trust Score of 94/100 and is classified as Low Risk.",
  "lastValidatedAt": "2026-07-16T00:00:00.000Z"
}
```

---

# Trust Score Object

The `trustScore` field is not just a number. It is a structured object that gives more detail about how the final score was built.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| score | Number | Final Trust Score from 0 to 100. |
| confidence | Number | Completeness indicator for the available validation data. |
| breakdownScore | Object | Section-by-section score breakdown. |

## Breakdown Fields

The `breakdownScore` object usually includes:

- `whoisScore`
- `sslScore`
- `websiteReachScore`
- `contactScore`
- `socialScore`
- `legalScore`
- `careerScore`

Each section score represents how well that module performed based on the rules defined in the scoring engine.

---

# Check Data

The `checks` object contains the raw module results returned by the validation services.

These results are useful for debugging, UI explanations, and reporting.

Common groups include:

- WHOIS details
- SSL certificate details
- Website reachability status
- Contact detection results
- Legal page detection results
- Social profile detection results
- Careers page detection results

The frontend can use these values to show detailed explanations instead of only displaying a single final score.

---

# Risk Level

The backend converts the final score into a risk level so the result is easier to interpret.

| Trust Score | Risk Level |
|-------------|------------|
| 80 to 100 | Low |
| 60 to 79 | Medium |
| 40 to 59 | High |
| 0 to 39 | Very High |

This classification is used in the summary text, validation history, and dashboard presentation.

---

# Summary Field

The `summary` field gives a short human-readable explanation of the result.

It normally includes:

- The hostname that was validated.
- The final Trust Score.
- The assigned Risk Level.
- Key evidence from the major validation sections.

The summary is designed to make the score understandable without requiring the user to inspect the raw module output.

---

# Validation Timestamps

The `lastValidatedAt` field records when the validation ran.

This timestamp helps with:

- Cache management.
- Validation history.
- Identifying fresh versus older results.

When the backend reuses a cached record, this timestamp helps determine whether the result is still within the valid cache window.

---

# Usage Notes

- Use `trustScore.score` when you only need the final score.
- Use `trustScore.breakdownScore` when you want to explain why the score was high or low.
- Use `confidence` when you need to decide how reliable the result is.
- Use `riskLevel` when you want a simple user-facing classification.

This structure allows the API to support both simple dashboards and detailed analysis views.
