# MongoDB Connection Audit and Fix Plan

Status: awaiting approval. No application-code or environment-value changes are included in this plan.

## Confirmed findings

- `.env.local` sets `MONGODB_URI` with the literal `<db_password>` placeholder.
- A direct MongoDB ping reaches the Atlas cluster and returns `bad auth : authentication failed`.
- The live Next.js server returns `200 null` for `/api/auth/get-session`.
- A sign-up request reaches Better Auth but returns `500`; the Next log records the same MongoDB authentication error.
- The sign-up page is wired to Better Auth, but the sign-in form has no `signIn` handler and therefore does not call the auth API.
- `lib/db.ts` is currently unused; Better Auth uses its own native MongoDB client and adapter.
- `npm run build` passes. `npm run lint` currently reports the lowercase `signup` component hook errors and minor `lib/db.ts` warnings/errors.

## Execution plan after approval

1. Replace the MongoDB URI placeholder with a valid Atlas database-user credential, URL-encoding any reserved password characters. Keep the credential only in `.env.local`; rotate it if it has been exposed.
2. Confirm the Atlas database user exists, has the required permissions, and that the current IP/network is allowed in Atlas Network Access.
3. Make the Better Auth MongoDB client configuration explicit and consistent, including the intended database name if one is required.
4. Implement the missing sign-in form submission using the existing Better Auth client and add appropriate loading/error handling.
5. Clean up or remove the unused Mongoose connection helper so there is one clear database connection path.
6. Fix the component naming/lint issues and protect the dashboard with a server-side session check before adding application data operations.
7. Restart the dev server after environment changes, then verify:
   - MongoDB ping succeeds.
   - Sign-up creates a user and session.
   - Sign-in creates a session.
   - `/api/auth/get-session` returns the authenticated session.
   - The dashboard rejects unauthenticated access.
   - `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.

## Approval boundary

Approval is requested before changing source files, `.env.local`, or making any MongoDB/Atlas account changes. The first required user-side input is a valid MongoDB Atlas database-user credential or confirmation that the credential should be reset in Atlas.
