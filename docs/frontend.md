# Frontend

## Overview

The frontend is a React application built with Vite. It provides the public landing page, login and registration flows, and the protected dashboard where users run company validations and review scan history.

The UI follows a simple flow:

1. Land on the marketing page.
2. Register or log in.
3. Open the dashboard.
4. Run a validation or review previous scans.

---

## Frontend Stack

- React
- Vite
- React Router
- Axios
- Lucide icons
- Local storage for token and theme persistence

---

## Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Landing page | Public |
| `/login` | Login page | Public |
| `/register` | Register page | Public |
| `/dashboard` | Dashboard page | Protected |

The dashboard is wrapped in a protected route so users must be authenticated before they can access validation tools and history.

---

## Core Pages

### Landing Page

The landing page introduces the product and shows an animated example of how the scoring flow works.

Important behavior:

- Displays trust-related signals such as WHOIS, SSL, reachability, legal pages, and careers.
- Uses a light and dark theme toggle.
- Stores the selected theme in `localStorage`.
- Routes users to login or dashboard actions.

### Login Page

The login page collects email and password and sends them to the backend auth API.

Important behavior:

- Validates that email and password are not empty.
- Checks that the email format is valid.
- Stores the returned token and user object in `localStorage`.
- Redirects to the dashboard after success.

### Registration Page

The registration page creates a new account and immediately signs the user in.

Important behavior:

- Collects name, email, password, and password confirmation.
- Validates password length and matching confirmation.
- Shows a simple password strength indicator.
- Saves the token and user object after successful registration.

### Dashboard Page

The dashboard is the main operational screen.

Important behavior:

- Accepts a domain or website URL.
- Runs a standard validation request or a forced fresh validation.
- Displays the current trust score, risk level, summary, and per-signal breakdown.
- Loads the user's history list from the backend.
- Opens a prior validation record from history when selected.
- Supports theme switching and sidebar navigation.

---

## Dashboard Layout

The dashboard is organized into a few reusable pieces:

- `Sidebar` for the user profile, history list, and logout action.
- `Topbar` for the mobile controls and theme switching.
- `SearchBox` for domain input and validation triggering.
- `ScanResult` for the score display and summary.
- `RecentHistory` for prior scans.

This structure keeps the validation workflow clear and prevents the page from becoming cluttered.

---

## Validation Workflow In The UI

1. The user enters a company domain.
2. The dashboard sends the request to the validation API.
3. While the request is running, the UI shows a scanning state.
4. When the response returns, the UI renders the score breakdown and summary.
5. The history list is refreshed so the new scan appears immediately.

The dashboard also offers a fresh validation action that bypasses the cache when the user wants the latest result.

---

## History Interaction

The sidebar shows recent validation records for the authenticated user.

Important behavior:

- The list can be filtered by hostname.
- The selected history item is highlighted.
- Clicking an item loads the full validation detail.
- The sidebar also exposes a logout action that clears stored auth data.

---

## Theme And Persistence

The application supports light and dark themes.

Theme behavior:

- Theme preference is stored in `localStorage`.
- The active theme is applied to the document root.
- The landing page, login page, registration page, and dashboard all respect the saved preference.

This keeps the experience consistent across sessions.

---

## API Integration

The frontend uses a small API layer to keep request logic separate from UI code.

Typical calls include:

- Register user
- Login user
- Fetch current profile
- Validate a company
- Force a fresh validation
- Fetch history list
- Fetch history detail

The Axios wrapper adds the backend base URL and carries the saved token in protected requests.

---

## Important UI Data

The validation result view uses the following pieces of data:

- Final trust score
- Risk level
- Summary text
- Section breakdown scores
- Last validated timestamp

These fields are enough for both a quick summary and a more detailed review.

---

## Design Notes

- The UI uses strong contrast and a clear trust-scoring visual language.
- The landing page includes motion and animated signal demos.
- The dashboard prioritizes speed and readability over decorative complexity.
- The scan result section is built to make the trust score easy to understand at a glance.
