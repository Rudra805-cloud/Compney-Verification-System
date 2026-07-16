# Security

## Overview

Security is a fundamental part of Veris. The application follows several security best practices to protect user accounts, APIs, and validation data.

The backend implements authentication, password hashing, authorization middleware, and input validation to ensure that only authenticated users can access protected resources.

---

## Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- Authorization middleware
- Secure password storage
- Input validation
- Error handling

---

# Authentication

Veris uses **JSON Web Tokens (JWT)** for user authentication.

When a user successfully registers or logs in, the backend generates a signed JWT. The frontend stores this token in **localStorage** and includes it in the `Authorization` header for all protected API requests.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token before allowing access to protected resources.

---

# Password Security

User passwords are never stored in plain text.

Before saving a new user, the password is securely hashed using **bcrypt**.

During login, the entered password is compared with the stored hash using bcrypt's comparison function.

This ensures that user credentials remain protected even if the database is compromised.

---

# Protected Routes

The following endpoints require authentication:

- GET `/api/auth/profile`
- POST `/api/validate`
- GET `/api/history`
- GET `/api/history/:validationId`

Requests without a valid JWT receive an authentication error.

---

# Error Handling

The API returns consistent HTTP status codes and JSON responses to help clients identify and handle errors effectively.

| Status Code | Description |
|-------------|-------------|
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 400 | Invalid request or input |
| 401 | Authentication failed or missing token |
| 404 | Requested resource not found |
| 500 | Internal server error |

Example error response:

```json
{
  "success": false,
  "message": "Authentication failed."
}
```

---

# Security Considerations

The current implementation includes the following security measures:

- JWT-based authentication for protected endpoints
- Password hashing using bcrypt
- Authorization middleware for private routes
- Separation of authentication, validation, and company data into different collections
- Validation caching to reduce unnecessary external API requests

---

# Future Security Enhancements

The following improvements are planned for future versions of Veris:

- Rate limiting to prevent API abuse
- Refresh token support
- Email verification
- Password reset functionality
- Role-based access control (RBAC)
- Request logging and monitoring
- Multi-factor authentication (MFA)