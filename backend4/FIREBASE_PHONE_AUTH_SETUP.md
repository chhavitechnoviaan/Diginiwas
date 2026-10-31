# DigiNiwas Firebase Phone Authentication changes

## What changed
- Added `POST /api/v1/auths/firebase-phone-login/check-account` (also available under the legacy `/api/auths/...` mount) to check the role + phone before the frontend sends an SMS.
- `POST /api/v1/auths/firebase-phone-login` now only logs in existing Buyer/Seller/Partner accounts. It never auto-creates a Buyer. Seller and Partner accounts must be active/approved/verified.
- Seller `POST /api/v1/sellers/applications/verify-phone` and Partner `PATCH /api/v1/partner-applications/:id/verify-phone` now verify a Firebase ID token and ensure its verified phone matches the registered application phone.
- Seller/Partner registration and phone resend routes return Firebase client instructions instead of using Twilio Verify for application phone verification. Existing separate Seller login OTP routes remain Twilio-based.
- Added Buyer-only `PATCH /api/v1/auth/change-password`.

## Critical Firebase constraint
Firebase Admin SDK cannot send SMS verification codes. SMS must be sent from the web/mobile client with Firebase Phone Authentication. Flow:
1. Call `POST /api/v1/auths/firebase-phone-login/check-account` with `{ "phone": "+919876543210", "role": "buyer" }` before login. If 404 `ACCOUNT_NOT_FOUND`, show “No account exists with this number. Please register.” and do not send SMS.
2. If account exists and `canLogin` is true, call Firebase client `signInWithPhoneNumber` (web) / Firebase phone auth (mobile) to send SMS.
3. User enters OTP; Firebase verifies it. Get the Firebase user ID token.
4. POST `{ "idToken": "<Firebase ID token>", "role": "buyer" }` to `/api/v1/auths/firebase-phone-login`.
5. For Seller/Partner registration, call Firebase Phone Auth after the application is created (Partner) or after the current Seller email-verification step, then send `{ "idToken": "<Firebase ID token>" }` to the respective `verify-phone` route. The registered phone and Firebase token phone must match.

## Environment / deployment
- Ensure Firebase Admin service-account credentials and Firebase project configuration match the same Firebase project used by the frontend.
- Keep `JWT_SECRET`, MongoDB credentials, Firebase service-account private keys, and SMTP credentials in your deployment environment, not in the ZIP or source control.
- The phone account pre-check intentionally discloses whether a phone exists. Add rate limiting and monitoring before production use.

## Postman
Import `DigiNiwas_Auth_APIs_Postman_Collection.json`. Set `baseUrl` to your local API or deployed API origin. Real Firebase ID tokens must be obtained from the client after an actual OTP challenge; the placeholder token in the collection will not work.
