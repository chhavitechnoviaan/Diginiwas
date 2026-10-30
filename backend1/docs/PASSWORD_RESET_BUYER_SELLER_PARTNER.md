# DigiNiwas Password Reset API — Buyer, Seller & Partner

These endpoints are mounted at `/api/v1/auth` and support all three account collections: Buyer, Seller, and Partner. Legacy `/api/auth` aliases are also mounted.

## 1. Request password reset OTP

**POST** `/api/v1/auth/forgot-password`

Headers: `Content-Type: application/json`

Buyer:
```json
{
  "email": "buyer@example.com",
  "role": "buyer"
}
```

Seller:
```json
{
  "email": "seller@example.com",
  "role": "seller"
}
```

Partner:
```json
{
  "email": "partner@example.com",
  "role": "partner"
}
```

Example success response:
```json
{
  "success": true,
  "message": "Password reset OTP sent to your registered email.",
  "data": {
    "email": "se****@example.com",
    "role": "seller",
    "expiresIn": "10 minutes"
  }
}
```

The response intentionally does not reveal whether an account exists when no matching account is found. SMTP must be configured using `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and optionally `MAIL_FROM`.

## 2. Verify OTP and set a new password

**POST** `/api/v1/auth/reset-password`

Buyer:
```json
{
  "email": "buyer@example.com",
  "role": "buyer",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}
```

Seller:
```json
{
  "email": "seller@example.com",
  "role": "seller",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}
```

Partner:
```json
{
  "email": "partner@example.com",
  "role": "partner",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}
```

Example success response:
```json
{
  "success": true,
  "message": "Password reset successfully. You can now login with your new password.",
  "data": {
    "role": "partner",
    "email": "partner@example.com"
  }
}
```

## Behaviour and validation

- `role` accepts `buyer`, `seller`, or `partner`; use it explicitly in both requests.
- `owner` is normalized to `seller`, and `tenant` is normalized to `buyer` for compatibility.
- OTP is six digits and expires after 10 minutes.
- Password must contain at least 8 characters.
- OTP is stored as a hash and is single-use. Other active reset requests for the same account are invalidated after a successful reset.
- Buyer and Seller passwords are hashed with bcrypt; Partner passwords use the project's `partnerCredentialService` hash helper.
- Blocked/suspended seller and blocked/rejected partner accounts are not sent a reset OTP.
- This flow resets passwords for the selected account role only. If the same email exists for multiple roles, always pass `role` to avoid ambiguity.

## Postman quick test

Set `baseUrl` to your deployed API origin, for example `https://api.diginiwas.com`.

1. `POST {{baseUrl}}/api/v1/auth/forgot-password` with the role-specific JSON above.
2. Read the OTP from the registered email inbox.
3. `POST {{baseUrl}}/api/v1/auth/reset-password` with the same email and role, the received OTP, and `newPassword`.
4. Test login using that role's existing login endpoint and the new password.

Do not use a real user's OTP or password in shared screenshots or source control.
