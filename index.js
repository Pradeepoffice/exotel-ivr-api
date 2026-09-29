const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000; // Render sets PORT automatically

// Exotel can send data as query params (GET) or form/JSON body (POST)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health check (open this in a browser to confirm the app is live)
app.get("/", (req, res) => {
  res.status(200).send("Exotel webhook is running");
});

// Main IVR endpoint: use this URL in Exotel's Passthru applet
app.all("/exotel/ivr", (req, res) => {
  const data = { ...req.query, ...req.body };

  // Exotel sends the pressed key as "digits", often wrapped in quotes like "\"1\""
  const digits = (data.digits || "").toString().replace(/"/g, "");

  const callInfo = {
    method: req.method,
    callSid: data.CallSid,
    from: data.CallFrom || data.From,
    to: data.CallTo || data.To,
    digits,
    flowId: data.flow_id,
    receivedAt: new Date().toISOString(),
  };

  console.log("Exotel IVR hit:", JSON.stringify(callInfo));
  console.log("Full payload:", JSON.stringify(data));

  // Reply immediately so Exotel doesn't time out.
  // Do any slow work (DB writes, other API calls) AFTER responding.
  res.status(200).type("text/plain").send("OK");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
