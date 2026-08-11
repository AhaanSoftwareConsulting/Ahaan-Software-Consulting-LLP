# auth-service (Node.js + Express + MySQL)

Authentication microservice: register, login, JWT access/refresh tokens with
rotation, logout / logout-all-devices, password reset, and email verification.

## Setup

```bash
cp .env.example .env
npm install
```

Create the database tables:
```bash
mysql -u root -p auth_db < src/db/schema.sql
```

Run:
```bash
npm run dev      # with nodemon (auto-restart)
# or
npm start
```

## Run with Docker (includes MySQL, auto-creates tables from schema.sql)

```bash
docker compose up --build
```

## Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /auth/register | Create a new account |
| POST | /auth/login | Authenticate, returns access + refresh token |
| POST | /auth/refresh | Rotate refresh token, returns new pair |
| POST | /auth/logout | Revoke a single refresh token |
| POST | /auth/logout-all | Revoke all sessions for the current user (auth required) |
| GET  | /auth/me | Current authenticated user (auth required) |
| POST | /auth/password-reset/forgot | Request a password reset |
| POST | /auth/password-reset/reset | Reset password using token |
| POST | /auth/email-verification/resend | Resend verification token |
| POST | /auth/email-verification/verify | Verify email using token |
| GET  | /health | Health check |

## Dev-mode token testing (no SMTP needed)

With `DEBUG=true` in `.env`, verification and password-reset tokens are
printed straight to the console instead of emailed — copy them from your
terminal to test in Postman.

## Notes / production TODOs

- Rate limiter is in-memory; swap for Redis-backed limiting across multiple instances.
- Email sending is synchronous; move to a background job queue (BullMQ, etc.).
- Set a strong `JWT_SECRET_KEY` and restrict `ALLOWED_ORIGINS` in production.
- Set `DEBUG=false` in production so tokens are actually emailed, not logged.
