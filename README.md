# Exotel IVR Webhook

Receives Exotel IVR (Passthru) callbacks and replies `200 OK`.

- Health check: `GET /`
- Exotel endpoint: `GET or POST /exotel/ivr`

Run locally:
    npm install
    npm start
    curl "http://localhost:3000/exotel/ivr?CallSid=test123&CallFrom=09999999999&digits=%221%22"
