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
| Website Availability | **10%** |
| Contact Information | **6%** |
| Legal Pages | **4%** |
| Social Presence | **3%** |
| Careers Information | **2%** |

The weighted approach ensures that strong security and domain ownership signals have a greater influence than optional website features.

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
