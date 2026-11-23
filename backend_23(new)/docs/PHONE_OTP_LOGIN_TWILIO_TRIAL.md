# DigiNiwas Phone OTP Login — Twilio Trial SMS

This flow does **not** use Twilio Verify, so `TWILIO_VERIFY_SERVICE_SID` is not required.

## Environment

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
# Optional instead of TWILIO_PHONE_NUMBER:
# TWILIO_MESSAGING_SERVICE_SID=MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Login flow

1. `POST /api/v1/auths/send-otp` with `phone` and `role`.
2. Backend checks the number in the Buyer/Seller/Partner collection.
3. Backend checks account status/approval.
4. Backend generates a 6-digit OTP, stores only a bcrypt hash for 10 minutes, and sends the OTP using Twilio Messages API.
5. `POST /api/v1/auths/resend-otp` generates a new OTP and replaces the previous OTP.
6. `POST /api/v1/auths/login-otp` verifies the OTP and returns the JWT.

## Requests

### Send OTP

```http
POST /api/v1/auths/send-otp
Content-Type: application/json
```

```json
{
  "phone": "9876543210",
  "role": "buyer"
}
```

### Resend OTP

```http
POST /api/v1/auths/resend-otp
Content-Type: application/json
```

```json
{
  "phone": "9876543210",
  "role": "buyer"
}
```

### Verify OTP / Login

```http
POST /api/v1/auths/login-otp
Content-Type: application/json
```

```json
{
  "phone": "9876543210",
  "role": "buyer",
  "otp": "123456"
}
```

Supported roles: `buyer`, `seller`, `partner`.

## Trial account

Twilio Trial accounts can have messaging restrictions. The destination number used for testing may need to be verified in Twilio Console. The `From` number must be a Twilio number available to the account. Do not expose the Twilio Auth Token in frontend code.
