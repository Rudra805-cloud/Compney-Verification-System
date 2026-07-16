# Security

## Overview

Veris protects user accounts, validation history, and API access using JWT authentication, password hashing, and route-level authorization.

The security model is simple: the frontend stores the token after login or registration, and the backend verifies that token before allowing access to protected resources.

---

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Authorization middleware
- Private user profile and history endpoints
- Input checks in the frontend forms
- Structured error responses

---

## Authentication Flow

1. A user registers or logs in.
2. The backend creates a signed JWT.
3. The frontend stores the token in `localStorage`.
4. The frontend sends the token in the `Authorization` header for protected requests.
5. The backend verifies the token through middleware before continuing.

Example header:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware rejects requests without a valid token and returns a `401` response.

---

## Password Security

User passwords are never stored in plain text.

- Passwords are hashed with bcrypt before being saved.
- The login flow compares the entered password against the stored hash.
- The `User` schema excludes the password field from normal query results.

This reduces the risk of exposing raw credentials if the database is accessed incorrectly.

---

## Route Protection

The protected backend routes are:

- `GET /api/auth/profile`
- `POST /api/validate`
- `GET /api/history`
- `GET /api/history/:validationId`

These routes require a valid bearer token. Without it, the backend returns an authorization failure and does not run the request handler.

---

## Data Exposure

Veris keeps different kinds of data in different collections:

- Users store identity and login data.
- Companies store current validation state.
- Validations store per-user history entries.

This separation helps avoid unnecessary duplication and keeps sensitive account data isolated from validation results.

---

## Error Handling

| Status Code | Meaning |
|-------------|---------|
| 200 | Request completed successfully. |
| 201 | Resource created successfully. |
| 400 | Invalid request or input. |
| 401 | Authentication failed or token missing. |
| 404 | Requested resource was not found. |
| 500 | Internal server error. |

Example error response:

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## Validation Safety Notes

- The validation flow relies on public website data, but the app still treats the result as untrusted until it is scored.
- Cached validation reduces repeated network calls to external sources.
- User-facing forms validate basic input before sending requests.
- Risky or unavailable signals are surfaced in the score and summary rather than hidden.

---

## Current Limitations

- No refresh token flow.
- No email verification.
- No password reset flow.
- No role-based access control.
- No rate limiting.
- No multi-factor authentication.

---

## Recommended Next Improvements

- Add request rate limiting.
- Move tokens to a safer storage strategy if the frontend requirements change.
- Add refresh-token support for longer sessions.
- Add email verification for new registrations.
- Add monitoring and audit logging for auth and validation failures.