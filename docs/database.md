# Database

## Overview

Veris uses MongoDB to store user accounts, validated companies, and validation history. The data model keeps authentication, company state, and scan history separated so each concern can be queried independently.

The project centers around three collections:

- `Users`
- `Companies`
- `Validations`

---

## Collection Details

### Users

The `Users` collection stores account information used for authentication.

#### Fields

| Field | Type | Notes |
|-------|------|-------|
| name | String | Required, trimmed. |
| email | String | Required, unique, lowercase, trimmed. |
| password | String | Hashed with bcrypt and excluded from normal queries. |
| createdAt | Date | Added by Mongoose timestamps. |
| updatedAt | Date | Added by Mongoose timestamps. |

#### Purpose

- Register new users.
- Authenticate login requests.
- Load the authenticated user profile.

---

### Companies

The `Companies` collection stores the latest validation state for a company domain.

#### Fields

| Field | Type | Notes |
|-------|------|-------|
| hostname | String | Required, lowercase, trimmed, indexed. |
| websiteUrl | String | Required, lowercase, trimmed. |
| appliedChecks | Object | Raw module output from the validation engine. |
| trustScore | Number | Final score from 0 to 100. |
| riskLevel | String | Risk label such as Low, Medium, High, or Very High. |
| summary | String | Human-readable validation summary. |
| lastValidatedAt | Date | Timestamp of the most recent validation run. |
| createdAt | Date | Added by Mongoose timestamps. |
| updatedAt | Date | Added by Mongoose timestamps. |

#### Purpose

- Cache the latest result for a company.
- Avoid repeating expensive validations too often.
- Keep the most recent score and summary available for quick display.

---

### Validations

The `Validations` collection stores the history of validations performed by users.

#### Fields

| Field | Type | Notes |
|-------|------|-------|
| userId | ObjectId | Reference to `Users`. |
| companyId | ObjectId | Reference to `Companies`. |
| appliedChecks | Object | Raw validation output used to build the score. |
| trustScore | Number | Final score recorded for that scan. |
| riskLevel | String | Risk label returned by the engine. |
| summary | String | Short explanation saved at scan time. |
| searchedAt | Date | When the user performed the scan. |
| lastValidatedAt | Date | When the underlying company data was last refreshed. |

#### Purpose

- Build the user-specific history sidebar.
- Preserve previous scans over time.
- Provide detailed validation records for the history detail view.

---

## Relationships

The database uses MongoDB references to connect the collections without duplicating all data in every record.

```text
Users
    │
    │ userId
    ▼
Validations
    │
    │ companyId
    ▼
Companies
```

### Relationship Rules

- One user can have many validation records.
- One company can appear in many validation records over time.
- Each validation record belongs to exactly one user.
- Each validation record belongs to exactly one company.

---

## Indexing And Constraints

- `Users.email` is unique so duplicate accounts cannot be created with the same email.
- `Companies.hostname` is indexed because it is a primary lookup field during validation.
- Passwords are excluded from default `User` queries using `select: false`.

These choices help the auth and validation flows stay fast and predictable.

---

## Data Flow

1. A user registers and a `User` record is created.
2. The user submits a website URL.
3. The backend normalizes the domain and checks whether a `Company` record already exists.
4. The validation engine updates the `Company` record with the latest score and summary.
5. A `Validation` record is created to link the user to that scan.
6. The dashboard reads `Validations` to display scan history.

---

## Why This Structure Works

- It avoids storing the same validation payload repeatedly in the UI history.
- It keeps user accounts separate from company trust data.
- It allows the app to show both the latest company state and the full validation trail.
