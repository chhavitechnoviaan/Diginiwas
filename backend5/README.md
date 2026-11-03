# Diginiwas-Admin-backend

## OTP / MSG91 configuration

Phone OTPs are sent through MSG91 Flow. Email OTPs remain on the existing SMTP/Nodemailer path, so an email OTP is never sent to SMS.

Set these backend environment variables:

- `MSG91_AUTH_KEY` — MSG91 auth key
- `MSG91_FLOW_ID` — the MSG91 Flow ID configured with your OTP template
- `MSG91_SENDER_ID` — optional when the sender is already configured in the flow
- `MSG91_OTP_VARIABLE` — the exact variable name used by the flow (defaults to `OTP`)

The MSG91 Flow must contain the matching OTP variable. The backend prefixes Indian 10-digit numbers with `91` before sending.
