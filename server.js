const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

// Load saved users
if (fs.existsSync("data.json")) {
  users = JSON.parse(fs.readFileSync("data.json"));
}

app.post("/spin", (req, res) => {
  const { userId } = req.body;

  // 🧠 get IP (fixed)
  const ip = (req.headers["x-forwarded-for"] || "")
              .split(",")[0] || req.socket.remoteAddress;

  // 🧠 get browser info
  const userAgent = req.headers["user-agent"];

  if (!userId) {
    return res.json({ error: "Invalid user!" });
  }

  // 🔐 stronger unique key
  const uniqueKey = userId + "_" + ip + "_" + userAgent;

  // 🚫 block repeat
  if (users[uniqueKey]) {
    return res.json({ error: "❌ You already spun!" });
  }

  const displayOptions = [
  "1","1.25","2","2.25","3","3.25","4","4.25","5"
];

  const result =
    options[Math.floor(Math.random() * options.length)];

  // ✅ save user
  users[uniqueKey] = true;

  fs.writeFileSync("data.json", JSON.stringify(users));

  res.json({ result });
});

app.listen(3000, () =>
  console.log("🚀 Server running on port 3000")
);