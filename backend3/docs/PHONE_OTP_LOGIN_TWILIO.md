# DigiNiwas Phone OTP Login (Twilio Verify)

## Requirement
Buyer, Seller and Partner can log in using their registered phone number. If the number exists in the selected role's collection and the account is active/approved, Twilio sends an SMS OTP. After OTP verification, the API returns the JWT.

> The `role` is required because the same phone number can exist in more than one collection. For example, a phone can belong to both a Buyer and Partner.

## Environment
```env
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_VERIFY_SERVICE_SID=VA...
```

## 1. Send OTP
`POST /api/v1/auths/send-otp`

```json
{
  "phone": "9876543210",
  "role": "buyer"
}
```

Accepted roles: `buyer`, `seller`, `partner`. `tenant` and `owner` are also accepted aliases.

Response:
```json
{
  "success": true,
  "message": "OTP sent successfully to your registered mobile number",
  "data": {
    "phone": "+919876543210",
    "expiresIn": "10 minutes",
    "channel": "sms"
  }
}
```

## 2. Verify OTP and Login
`POST /api/v1/auths/login-otp`

```json
{
  "phone": "9876543210",
  "role": "buyer",
  "otp": "123456"
}
```

On success, the response contains `token`. Store the token and redirect to the appropriate dashboard.

## 3. Resend OTP
`POST /api/v1/auths/resend-otp`

```json
{
  "phone": "9876543210",
  "role": "buyer"
}
```

The response does not contain the OTP. Twilio sends the new code by SMS.

## Frontend flow
1. User selects Buyer/Seller/Partner.
2. User enters phone number.
3. Call `send-otp`.
4. Show OTP input.
5. Call `resend-otp` only after the resend timer allows it.
6. Call `login-otp` with the entered OTP.
7. Save the returned JWT and redirect to the role dashboard.

## Important
- Do not generate/store login OTPs in MongoDB for this flow. Twilio Verify handles OTP generation and verification.
- Do not return OTP in API responses.
- For Indian numbers, `9876543210` is normalized to `+919876543210`.
- Seller accounts must be `APPROVED` and `ACTIVE`.
- Partner accounts must be approved and not blocked/rejected.
- Buyer accounts must be active when a `status` field is present.


## Phone OTP is also used for seller/partner verification
The seller application phone endpoints and partner application phone verification use the same Twilio Verify service. The OTP is never generated or returned by the frontend/backend application.

- `POST /api/sellers/applications/verify-phone` with `{ applicationId, otp }`
- `POST /api/sellers/applications/resend-phone-otp` with `{ applicationId }`
- `POST /api/sellers/auth/send-login-otp` with `{ phone }`
- `POST /api/sellers/auth/login-with-otp` with `{ phone, otp }`
- `PATCH /api/partner-applications/:id/verify-phone` with `{ otp }`
- `POST /api/partner-applications/:id/resend-otp` with `{ channel: "phone" }`

For all of these phone flows, Twilio Verify handles OTP generation, delivery and verification. Do not return the OTP in an API response and do not store a local OTP hash for these Twilio-managed flows.
