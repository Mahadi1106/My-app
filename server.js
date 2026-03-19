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
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  if (users[ip]) {
    return res.json({ error: "❌ You already spun!" });
  }

  const options = [
    "1","1.5","2","2.5","3","3.5","4","4.5","5",
    "5.5","6","6.5","7","7.5","8","8.5","9","9.5","10"
  ];

  const result =
    options[Math.floor(Math.random() * options.length)];

  users[ip] = true;

  fs.writeFileSync("data.json", JSON.stringify(users));

  res.json({ result });
});

app.listen(3000, () =>
  console.log("🚀 Server running on port 3000")
);