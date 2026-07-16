# Trust Score Engine

## Overview

The Trust Score Engine is responsible for converting the results of multiple validation modules into a single Trust Score ranging from **0 to 100**.

Instead of relying on a single validation result, Veris evaluates multiple trust indicators such as domain registration, SSL configuration, website accessibility, legal pages, contact information, social presence, and careers information.

Each validation module contributes a weighted score to the final Trust Score, ensuring that more reliable indicators have a greater impact on the final assessment.

The engine also calculates a Confidence Score that represents how complete the collected validation data is.

---

# Score Distribution

The Trust Score is calculated using weighted contributions from different validation modules.

| Module | Weight |
|---------|--------|
| WHOIS Validation | **45%** |
| SSL Validation | **30%** |
| Website Reach | **10%** |
| Contact Information | **6%** |
| Legal Pages | **4%** |
| Social Presence | **3%** |
| Careers Information | **2%** |

The weighted approach ensures that strong security and domain ownership signals have a greater influence than optional website features.

> Note: the current scoring implementation uses a comparable weighted model, but the exact runtime weights are:
> WHOIS 45%, SSL 30%, Website Reach 10%, Contact 6%, Legal 4%, Social 3%, and Careers 2%.

---

# Scoring Formula

Each validation section is scored independently on a scale of 0 to 100. The final Trust Score is then calculated as a weighted blend of those section scores.

```text
Trust Score =
	WHOIS * 0.45 +
	SSL * 0.30 +
	Website Reach * 0.10 +
	Contact * 0.06 +
	Legal * 0.04 +
	Social * 0.03 +
	Careers * 0.02
```

The score is always clamped to the 0 to 100 range.

The engine also applies a few business rules to keep the result realistic:

- A very weak site with no reachable website, no valid SSL, and no registered WHOIS data is forced to a score of 0.
- Very new domains with weak WHOIS signals and no supporting trust indicators are capped more conservatively.
- Older domains with stronger WHOIS and SSL evidence can receive a small positive adjustment.

---

# Section Scoring

Each validation module contains multiple validation rules.

Every rule contributes a predefined weight.

Examples include:

## WHOIS

- Domain registration
- Domain activity
- Domain age
- Registrar information
- DNS Provider
- DNSSEC
- Nameservers
- Owner Address

## SSL

- Valid certificate
- Hostname verification
- Expiration status
- Encryption strength
- Certificate issuer
- Subject Common Name
- Subject Alternative Names

## Website

- Website availability
- HTTP response

## Contact Information

- Email address
- Phone number
- Contact page

## Legal Pages

- Privacy Policy
- Terms & Conditions
- About page

## Social Presence

- LinkedIn
- Facebook
- Instagram
- X (Twitter)

## Careers

- Careers page

---

# Confidence Score

In addition to the Trust Score, the engine calculates a Confidence Score.

The Confidence Score represents how complete the collected validation data is. It does not measure trustworthiness directly. Instead, it shows whether enough checks were available to make the Trust Score more reliable.

### How It Works

- Each section is assigned a coverage weight.
- Every field that is present contributes to the Confidence Score.
- Missing fields reduce the confidence value.
- The final result is normalized to a percentage from 0 to 100.

### Interpretation

- High confidence means most validation sections returned usable data.
- Medium confidence means some sections were incomplete.
- Low confidence means the result should be treated cautiously because several inputs were missing.

---

# Risk Levels

The Trust Score is mapped to a Risk Level for easier interpretation in the UI and API response.

| Trust Score | Risk Level |
|-------------|------------|
| 80 to 100 | Low |
| 60 to 79 | Medium |
| 40 to 59 | High |
| 0 to 39 | Very High |

This classification is used in the summary output and validation response.

---

# Output Structure

The validation service returns the Trust Score as a structured object instead of a single number.

Typical fields include:

- `score`: the final Trust Score from 0 to 100.
- `confidence`: how complete the input data is.
- `breakdownScore`: a per-section score breakdown.

Example breakdown fields:

- `whoisScore`
- `sslScore`
- `websiteReachScore`
- `contactScore`
- `socialScore`
- `legalScore`
- `careerScore`

The API response also includes the overall `riskLevel`, a generated summary, and the host name that was validated.

---

# Summary Interpretation

The summary text is designed to help users understand the score at a glance.

It usually includes:

- The final Trust Score.
- The assigned Risk Level.
- A short explanation for each major section.
- Risk flags for notable weaknesses, such as missing SSL or missing contact details.

This makes the Trust Score useful both for automated checks and for human review.
